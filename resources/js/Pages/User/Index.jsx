import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";
import {useState} from "react";

export default function Index({ auth, users, queryParams = null, success = null }) {

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  queryParams = queryParams || {};
  console.log(users);
 const searchFieldChanged = (name, value) => {
   if (value) {
     queryParams[name] = value;
   } else {
     delete queryParams[name];
   }
   router.get(route('user.index'), queryParams);
 }

 const onKeyPress = (name, e) => {
   if (e.key !== 'Enter') return
   searchFieldChanged(name, e.target.value)
 }

 const sortChanged = (name) => {
   if (name === queryParams.sort_field) {
     queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
   } else {
     queryParams.sort_field = name;
     queryParams.sort_direction = 'asc';
   }
   router.get(route('user.index'), queryParams);
 }

  const handleDelete = (userId) => {
    setConfirmDeleteId(userId);
  };

  const confirmDelete = (userId) => {
    router.delete(route('user.destroy', {user: userId}));
    setConfirmDeleteId(null);
  };
  return (
    <>
      <Authenticated user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>} >

        <Head title="Users"/>
        {success &&
        <div className='bg-emerald-500 py-2 text-white text-center'>
          <p className="font-bold">{success}</p>
        </div>}
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="flex justify-between items-center p-6">
                  <h2 className="font-semibold text-xl text-gray-800 leading-tight ">Users</h2>
                  <Link href={route('user.create')} className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                    Create User
                  </Link>
                </div>
              {/*<pre>*/}
              {/*   {JSON.stringify(users)}*/}
              {/*</pre>*/}
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-nowrap">
                    <TableHeading
                      name="id"
                      sort_direction={queryParams.sort_direction}
                      sort_field={queryParams.sort_field}
                      sortChanged={sortChanged} >
                      ID
                    </TableHeading>
                    <TableHeading
                      name="name"
                      sort_direction={queryParams.sort_direction}
                      sort_field={queryParams.sort_field}
                      sortChanged={sortChanged} >
                      Name
                    </TableHeading>
                    <TableHeading
                      name="email"
                      sort_direction={queryParams.sort_direction}
                      sort_field={queryParams.sort_field}
                      sortChanged={sortChanged}>
                      Email
                    </TableHeading>
                    <TableHeading
                      name="created_at"
                      sort_direction={queryParams.sort_direction}
                      sort_field={queryParams.sort_field}
                      sortChanged={sortChanged}>
                      Create date
                    </TableHeading>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-nowrap">
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2">
                      <TextInput className="w-full" placeholder="User name" defaultValue={queryParams.name}
                                 onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                 onKeyPress={(e) => onKeyPress('name', e)}/>
                    </th>
                    <th className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <TextInput className="w-full" placeholder="User email" defaultValue={queryParams.email}
                                 onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                 onKeyPress={(e) => onKeyPress('name', e)}/>
                    </th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {users.data.map((user) => (
                    confirmDeleteId !== user.id ? (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                        <th className="px-3 py-2">{user.id}</th>
                        <th className="px-3 py-2 text-white hover:underline">
                          <Link href={route('user.show', user.id)}>
                            {user.name}
                          </Link>
                        </th>
                        <td className="px-3 py-2">
                          {user.email}
                        </td>
                        <td className="px-3 py-2">{user.created_at}</td>
                        <td className="px-3 py-2 text-align-right">
                          <Link href={route('user.edit', user.id)}
                             className="text-blue-500 hover:text-blue-700 mr-1">Edit</Link>
                          <button onClick={()=>handleDelete(user.id)} className="text-blue-500 hover:text-blue-700">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td colSpan="8" className="my-5 px-3 py-2 bg-red-500 text-white text-center text-4xl rounded-lg">
                          Confirm to delete
                          <button onClick={() => confirmDelete(user.id)} className="text-white ml-2">
                            Yes
                          </button>
                          <button onClick={() => setConfirmDeleteId(null)} className="text-white ml-2">
                            No
                          </button>
                        </td>
                      </tr>
                    )
                  ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={users.meta.links}/>
            </div>
          </div>
        </div>

      </Authenticated>
    </>
  );
}
