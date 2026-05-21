import { useEffect, useState }
from "react";

function Dashboard() {

  const [users, setUsers] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

    const [showUsers, setShowUsers] =
  useState(false);

  const [showOrders, setShowOrders] =
  useState(false);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      const response =
        await fetch(
          "http://localhost:5000/api/users"
        );

      const data =
        await response.json();

      setUsers(data);
    };


    const fetchOrders = async () => {

  const response = await fetch(
    "http://localhost:5000/api/orders"
  );

  const data =
    await response.json();

  setOrders(data);
};

  return (

    <div>

      <h1>Dashboard</h1>


      <h2>Users</h2>
      <button
        onClick={() => setShowUsers(!showUsers)}
        style={{ marginRight: "16px" }}
      >
        {showUsers ? "Hide Users" : "Show Users"}
      </button>

      <button
        onClick={() => {
          setShowOrders(!showOrders);
          if (!showOrders) {
            fetchOrders();
          }
        }}
        style={{ marginBottom: "16px" }}
      >
        {showOrders ? "Hide Orders" : "Show Orders"}
      </button>


      {showUsers && (
        <div>
          {users.map((user) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </div>
      )}

      {showOrders && (
        <div>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                margin: "10px",
              }}
            >
              <p>User: {order.user_name}</p>
              <p>Product: {order.product_name}</p>
              <p>Quantity: {order.quantity}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Dashboard;