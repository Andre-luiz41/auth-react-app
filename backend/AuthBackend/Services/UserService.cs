using AuthBackend.Models;
using AuthBackend.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace AuthBackend.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<User?> Authenticate(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null || !VerifyPassword(password, user.Password))
                return null;

            return user;
        }

        public async Task<User> Create(User user)
        {
            // Verificar se o email já existe
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                throw new Exception("Email já está em uso.");

            user.Password = HashPassword(user.Password); // Hash da password antes de guardar
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private string HashPassword(string password)
        {
            // Usar um algoritmo de hash seguro como o SHA256
            using (var sha256 = SHA256.Create())
            {
                var passwordBytes = Encoding.UTF8.GetBytes(password);
                var hashedBytes = sha256.ComputeHash(passwordBytes);
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            // Comparar o hash da password fornecida com o hash armazenado
            var hashedInput = HashPassword(password);
            return hashedInput == hashedPassword;
        }

        public string GenerateJwtToken(User user)
        {
            // Gerar um token JWT para autenticação
            var secretKey = _configuration["JwtSettings:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
                throw new InvalidOperationException("JWT secret key is not configured.");
            var key = Encoding.ASCII.GetBytes(secretKey); // Acede à chave secreta de appsettings.json
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // Adicionado NameIdentifier
                }),
                Expires = DateTime.UtcNow.AddHours(8), // Expira em 8 horas
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<User?> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user;
        }
    }
}