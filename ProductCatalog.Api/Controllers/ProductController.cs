using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Api.Dtos;
using ProductCatalog.Api.Services;
using System;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductService _service;

    public ProductController(ProductService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _service.GetById(id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAll();
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProductDto dto)
    {
        await _service.Create(dto);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ProductDto dto)
    {
        await _service.Update(id, dto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.Delete(id);
        return Ok();
    }
}
