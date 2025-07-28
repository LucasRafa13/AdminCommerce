using ProductCatalog.Api.Models;

namespace ProductCatalog.Api.Repositories;

public interface IDepartmentRepository
{
    Task<IEnumerable<Department>> GetAll();
}
