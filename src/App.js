import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

const App = () => {

  const [data, setData] = useState();
  const [userData, setUserData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState();



  const getData = async () => {
    const result = await axios.get("https://jsonplaceholder.typicode.com/todos");
    let newResponse = result?.data.slice(0, 10);
    setData(newResponse);
    console.log(result.data);
  }

  useEffect(() => {
    getData();
  }, []);



  const handleViewUser = async (value) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${value.id}`)
    if (response.status == 200) {
      setIsVisible(true);
    }
    response.data["title"] = value.title;
    response.data["todoid"] = value.id;

    setUserData(response.data)
    // console.log(response.data);
    // console.log(id)
  }


  const handleSearch = () => {
    const list = data?.filter((value, i) => {
      if (search == value.id || search == value.title || search == value.completed.toString) {
        return value;
      }
    })
    setData(list);
  }

  return (<>

    <div className="main">
      <div className="container">

        <div className="wrapper">

          <div className="display-data">
            <h3 className="heading">Todos</h3>
            <div className="search">

              <input type="search" value="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              <button onClick={handleSearch}>Search</button>
              <button onClick={() => { setSearch(""); getData() }}>Clear Search</button>

            </div>
            <table className="table2">
              <tr className="table2">
                <th>Todo Id</th>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

              {
                data?.map((value, index) => {
                  return (
                    <tr key={index}>

                      <td className="table2">{value.id}</td>
                      <td className="table2">{value.title}</td>
                      <td className="table2">{value.completed === false ? "Complete" : "Incomplete"}</td>
                      <td className="table2">{<button onClick={() => { handleViewUser(value) }}>View User</button>}</td>
                      <hr />

                    </tr>


                  )

                })
              }
            </table>
          </div>



          <div className="view-data">
            <div className="child">
              <h2 >User Detail</h2>
              {

                isVisible && (
                  <table className="table">
                    <td className="col">
                      <tr>ToDo ID </tr>
                      <tr>User ID</tr>
                      <tr>ToDo Title</tr>
                      <tr>Name</tr>
                      <tr>Email</tr>
                    </td>
                    <td >
                      <tr >{userData?.todoid}</tr>
                      <tr > {userData?.id}</tr>
                      <tr > {userData?.title}</tr>
                      <tr > {userData?.name}</tr>
                      <tr >{userData?.email}</tr>
                    </td>
                  </table>)
              }
            </div>
          </div>


        </div >
      </div >
    </div >
  </>);
};


export default App;