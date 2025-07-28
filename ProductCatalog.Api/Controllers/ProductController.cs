using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Api.Dtos;
using ProductCatalog.Api.Services;

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
