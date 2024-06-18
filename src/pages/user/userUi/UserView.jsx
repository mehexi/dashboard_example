import { useEffect, useState } from "react";
import TableData from "@/components/coustomUi/TableData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/axios/AxiosIntence";
import PaginationComp from "@/components/coustomUi/Pagination";
import { useNavigate } from "react-router-dom";

const UserView = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const result = await axiosInstance.get(`/general/users?page=${currentPage}&limit=${limit}`);
          console.log(result.data.data);
          setData(result.data.data);
          setTotalPages(result.data.totalPages);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }, [currentPage, limit]);
  
    const columns = [
      { key: "name", header: "Name", className: "font-medium capitalize", render: (row) => row.name },
      { key: "email", header: "Email", className: "font-medium ", render: (row) => row.email },
      { key: "city", header: "City", className: "font-medium capitalize", render: (row) => row.city },
      { key: "state", header: "State", className: "font-medium capitalize", render: (row) => (row.state ? row.state : "N/A") },
      { key: "country", header: "Country", className: "font-medium capitalize", render: (row) => row.country },
      { key: "occupation", header: "Occupation", className: "font-medium capitalize", render: (row) => row.occupation },
      { key: "phoneNumber", header: "Phone Number", className: "font-medium capitalize", render: (row) => row.phoneNumber },
      { key: "role", header: "Role", className: "font-medium capitalize", render: (row) => row.role },
      { key: "transactions", header: "Transactions", className: "font-medium capitalize", render: (row) => row.transactions.length },
    ];

    const navigate = useNavigate()

    const selectUser = data => {
        // console.log(data)
        const id = data._id
        navigate(`${id}`)
    }

    return (
        <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>User list for all users</CardDescription>
        </CardHeader>
        <CardContent>
          <TableData columns={columns} data={data} onClick = {selectUser}/>
          <PaginationComp
            currentPage={currentPage}
            pageSize={limit}
            totalItems={totalPages * limit}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    );
};

export default UserView;