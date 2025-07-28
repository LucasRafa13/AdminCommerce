using ProductCatalog.Api.Config;
using ProductCatalog.Api.Models;
using Dapper;

namespace ProductCatalog.Api.Repositories;

public class DepartmentRepository : IDepartmentRepository
{
    private readonly DbConfig _dbConfig;

    public DepartmentRepository(DbConfig dbConfig)
    {
        _dbConfig = dbConfig;
    }

    public async Task<IEnumerable<Department>> GetAll()
    {
        using var connection = _dbConfig.CreateConnection();
        var query = "SELECT * FROM departments";
        return await connection.QueryAsync<Department>(query);
    }
}
