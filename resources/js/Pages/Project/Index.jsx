import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.js";
import SelectInput from "@/Components/SelectInput.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";

export default function Index({ auth, projects, queryParams = null, success = null }) {

  queryParams = queryParams || {};
  console.log(projects);
 const searchFieldChanged = (name, value) => {
   if (value) {
     queryParams[name] = value;
   } else {
     delete queryParams[name];
   }
   router.get(route('project.index'), queryParams);
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
   router.get(route('project.index'), queryParams);
 }

  return (
    <>
      <Authenticated user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>} >

        <Head title="Projects"/>
        {success &&
        <div className='bg-emerald-500 py-2 text-white text-center'>
          <p className="font-bold">{success}</p>
        </div>}
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="flex justify-between items-center p-6">
                  <h2 className="font-semibold text-xl text-gray-800 leading-tight ">Projects</h2>
                  <Link href={route('project.create')} className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                    Create Project
                  </Link>
                </div>
              {/*<pre>*/}
              {/*   {JSON.stringify(projects)}*/}
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

                    <th className="px-3 py-2">Image</th>
                    <TableHeading
                      name="name"
                      sort_direction={queryParams.sort_direction}
                      sort_field={queryParams.sort_field}
                      sortChanged={sortChanged} >
                      Name
                    </TableHeading>
                    <TableHeading
                      name="status"
                      sort_direction={queryParams.sort_direction}
                      sort_field={queryParams.sort_field}
                      sortChanged={sortChanged}>
                      Status
                    </TableHeading>
                    <TableHeading
                      name="created_at"
                      sort_direction={queryParams.sort_direction}
                      sort_field={queryParams.sort_field}
                      sortChanged={sortChanged}>
                      Create date
                    </TableHeading>
                    <TableHeading
                      name="due_date"
                      sort_direction={queryParams.sort_direction}
                      sort_field={queryParams.sort_field}
                      sortChanged={sortChanged}>
                      Due date
                    </TableHeading>
                    <th className="px-3 py-2">Created by</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-nowrap">
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2">
                      <TextInput className="w-full" placeholder="Project name" defaultValue={queryParams.name}
                                 onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                 onKeyPress={(e) => onKeyPress('name', e)}/>
                    </th>
                    <th className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <SelectInput className="w-full" onChange={e => searchFieldChanged('status', e.target.value)}
                                   defaultValue={queryParams.status}>
                        <option value="">Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </SelectInput>
                    </th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {projects.data.map((project) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                      <th className="px-3 py-2">{project.id}</th>
                      <td className="px-3 py-2">
                        <img src={project.image_path} alt="" style={{width: '150px', height: '100px'}}/>
                      </td>
                      <th className="px-3 py-2 text-white hover:underline">
                        <Link href={route('project.show', project.id)}>
                          {project.name}
                        </Link>
                      </th>
                      <td className="px-3 py-2">
                      <span
                        className={`px-3 py-2 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>{PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                      </td>
                      <td className="px-3 py-2">{project.created_at}</td>
                      <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                      <td className="px-3 py-2">{project.createdBy.name}</td>
                      <td className="px-3 py-2 text-align-right">
                        <a href={route('project.edit', project.id)}
                           className="text-blue-500 hover:text-blue-700 mr-1">Edit</a>
                        <a href={route('project.edit', project.id)}
                           className="text-blue-500 hover:text-blue-700">Delete</a>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links}/>
            </div>
          </div>
        </div>

      </Authenticated>
    </>
  );
}
