using ProductCatalog.Api.Models;
using ProductCatalog.Api.Repositories;

namespace ProductCatalog.Api.Services;

public class DepartmentService
{
    private readonly IDepartmentRepository _repository;

    public DepartmentService(IDepartmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Department>> GetAll()
    {
        return await _repository.GetAll();
    }
}
