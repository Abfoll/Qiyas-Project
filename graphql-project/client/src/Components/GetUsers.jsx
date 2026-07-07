import React from "react";
import { useQuery } from "@apollo/client/react";
import { LOAD_USERS } from "../GraphQL/Queries";

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const users = data?.getAllUsers ?? [];
  const visibleUsers = users.slice(-10);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Latest 10 users</h2>
      {visibleUsers.map((val) => {
        return (
          <h1 key={val.id}>
            {val.firstName} {val.lastName} {val.email}
          </h1>
        );
      })}
    </div>
  );
}

export default GetUsers;