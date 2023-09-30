using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PlatankaAPI.Models;
using PlatankaAPI.Models.obj;
using PlatankaAPI.Services;

namespace PlatankaAPI.Controllers
{
    [Route("api/Categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {

        private ICategoriesService _categoriesService;
        public CategoriesController(ICategoriesService categories)
        {
            _categoriesService = categories;
        }

        [HttpPost("")]
        public async Task<IActionResult> AddCategory(string name)
        {
            var r = await _categoriesService.CreateCategory(name);
            if (r!=null) return Ok("Category added successfully.");
            return BadRequest("Something goes wrong");
        }
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Category>>> Categories()
        {
            var r = await _categoriesService.GetCategories();
            return Ok(r);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Category>>> Category(string id)
        {
            var r = await _categoriesService.GetCategory(id);
            if (r != null) return Ok(r);
            return BadRequest("Id Isnt Exist");
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Category>>> Delete(string id)
        {
            var r = await _categoriesService.Delete(id);
            if (r) return Ok("Category successfuly deleted");
            return BadRequest("Id Isnt Exist");
        }

        [HttpPatch("")]
        public async Task<ActionResult<IEnumerable<Category>>> Patch(Category category)
        {
            var r = await _categoriesService.Patch(category);
            if (r) return Ok("Category successfuly modified");
            return BadRequest("Id Isnt Exist");
        }
    }
}