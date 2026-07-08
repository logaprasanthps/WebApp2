using System.ComponentModel.DataAnnotations;

namespace WebApp2.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public decimal Salary { get; set; }
    }
}
