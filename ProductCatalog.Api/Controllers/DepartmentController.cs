using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Api.Services;

namespace ProductCatalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentController : ControllerBase
{
    private readonly DepartmentService _service;

    public DepartmentController(DepartmentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAll();
        return Ok(result);
    }
}
