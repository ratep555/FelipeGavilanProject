using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MoviesAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    // bolje je koristiti ovo nego defaultno controller, mijenjanjem imena
    // controllera onda se mijenja i ovo, a klijenti imaju stari path
    [Route("api/genres")]
    [ApiController]

    public class GenresController : ControllerBase
    {
        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;

        public GenresController(ILogger<GenresController> logger, ApplicationDbContext context)
        {
            this.logger = logger;
            this.context = context;
        }

        [HttpGet] // api/genres
        public async Task<ActionResult<List<Genre>>> Get()
        {
            logger.LogInformation("Getting all the genres");

            return await context.Genres.ToListAsync();

        }

        [HttpGet("{Id:int}", Name = "getGenre")] // api/genres/example
        public ActionResult<Genre> Get(int Id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Genre genre)
        {
            context.Add(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public ActionResult Put([FromBody] Genre genre)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public ActionResult Delete()
        {
            throw new NotImplementedException();
        }
    }
}




