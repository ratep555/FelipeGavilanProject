using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Validations
{
    public class FirstLetterUppercaseAttribute : ValidationAttribute
    {
        //value je value propertija, validationcontext je context in which the validation is running
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            //validaciju ne želimo primjenjivati na praznom polju, zato ovo dolje
            if (value == null || string.IsNullOrEmpty(value.ToString()))
            {
                return ValidationResult.Success;
            }

            var firstLetter = value.ToString()[0].ToString();

            if (firstLetter != firstLetter.ToUpper())
            {
                return new ValidationResult("First letter should be uppercase");
            }

            return ValidationResult.Success;
        }
    }
}