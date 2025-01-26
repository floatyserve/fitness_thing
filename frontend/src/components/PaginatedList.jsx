import { useState, useEffect } from "react";
import { Table, Pagination, Form, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function PaginatedList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://svra-ubuntu-server-0093.virtual.cloud.tuke.sk:5000/api/trainings");
        const result = await response.json();
        setData(result);
        // console.log("Data fetched:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // get current items for the active page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // generate page number items for the Pagination component
  const paginationItems = [];
  for (let page = 1; page <= totalPages; page++) {
    paginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <Col xs="auto">
          <Form.Label>Items per page:</Form.Label>
        </Col>
        <Col xs="auto">
          <Form.Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Form.Select>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Min Pulse</th>
            <th>Max Pulse</th>
            <th>Avg Pulse</th>
            <th>Steps Taken</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((item, idx) => {
          // Parse and format the timestamp
          let formattedTimestamp = new Date(item.timestamp).toLocaleString("sk-SK", {
            weekday: "long", 
            year: "numeric", 
            month: "short",   
            day: "numeric",   
            hour: "numeric",  
            minute: "2-digit", 
          });

          formattedTimestamp = formattedTimestamp
          .split(" ")
          .map((word) =>
             word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join(" ");

          return (
            <tr key={idx}>
              <td>{formattedTimestamp}</td>
              <td>{item.minpulse}</td>
              <td>{item.maxpulse}</td>
              <td>{item.avgpulse}</td>
              <td>{item.steps}</td>
            </tr>
          );
        })}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />

        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {paginationItems}

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />

        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
}

export default PaginatedList;
