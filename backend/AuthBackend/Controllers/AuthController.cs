using AuthBackend.Models;
using AuthBackend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace AuthBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            try
            {
                var newUser = await _userService.Create(model);
                return Ok(new { message = "Utilizador registado com sucesso!", user = newUser });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User model)
        {
            var user = await _userService.Authenticate(model.Email, model.Password);
            if (user == null)
                return Unauthorized(new { message = "Email ou senha inválidos." });

            var token = _userService.GenerateJwtToken(user);
            return Ok(new { message = "Login realizado com sucesso!", token, user });
        }

        [HttpGet("profile")]
        [Authorize] // Protege este endpoint, exigindo autenticação
        public async Task<IActionResult> GetProfile()
        {
            // Obtém o ID do utilizador autenticado a partir da claim "id" do token
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id");
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized(new { message = "Token inválido ou ID do usuário não encontrado." });
            }

            var user = await _userService.GetUserById(userId);
            if (user == null)
                return NotFound(new { message = "Utilizador não encontrado." });

            return Ok(new { user });
        }
    }
}
