import { useState, useEffect } from 'react';
import axios from 'axios';

function Pagination() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        setData(response.data);
        console.log(response.data); 
      } catch (error) {
        setError('Failed to fetch data');
        alert('Failed to fetch data');
        
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const onPageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(data.length / 10)) {
      return; 
    }
    setPage(newPage);
  };

  const renderTableData = () => {
    const startIndex = (page - 1) * 10;
    const endIndex = Math.min(startIndex + 10, data.length);
    return data.slice(startIndex, endIndex).map((employee, index) => {
      return (
        <tr key={startIndex + index}>
          <td>{employee.id}</td>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.role}</td>
        </tr>
      );
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
        <h1 className="heading">Employee Data Table</h1>
      <table>
        <thead>
          <tr className='table-heading'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className='table-data'>{renderTableData()}</tbody>
      </table>
      <div className='pagination'>
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>Previous</button>
        <span>{page}</span>
        <button onClick={() => onPageChange(page + 1)} disabled={page === Math.ceil(data.length / 10)}>Next</button>
      </div>
    </div>
  );
}

export default Pagination;
