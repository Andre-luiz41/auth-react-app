using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AuthBackend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O email é obrigatório.")]
        [EmailAddress(ErrorMessage = "Email inválido.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [MinLength(8, ErrorMessage = "A senha deve ter pelo menos 8 caracteres.")]
        public required string Password { get; set; } // Setter explicitamente público

        [Required(ErrorMessage = "O nome é obrigatório.")]
        public required string Name { get; set; }
    }
}
