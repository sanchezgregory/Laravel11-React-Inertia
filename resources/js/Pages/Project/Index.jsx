import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function Index({ auth, projects }) {
  return (
    <>
      <Authenticated user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}>

        <Head title="Projects" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900">Projects</div>
              {/*<pre>*/}
              {/*   {JSON.stringify(projects)}*/}
              {/*</pre>*/}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">Id</th>
                      <th className="px-3 py-2">Image</th>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Create at</th>
                      <th className="px-3 py-2">Due data</th>
                      <th className="px-3 py-2">Created by</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                        <th className="px-3 py-2">{project.id}</th>
                        <td className="px-3 py-2">
                          <img src={project.image_path} alt="" style={{ width: '150px', height: '100px'}}/>
                        </td>
                        <td className="px-3 py-2">{project.name}</td>
                        <td className="px-3 py-2">{project.status}</td>
                        <td className="px-3 py-2">{project.created_at}</td>
                        <td className="px-3 py-2">{project.due_date}</td>
                        <td className="px-3 py-2">{project.created_by.name}</td>
                        <td className="px-3 py-2">
                          <a href={route('project.edit', project.id)} className="text-blue-500 hover:text-blue-700">Edit</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination links={projects.meta.links}/>
            </div>
          </div>
        </div>

      </Authenticated>
    </>
  );
}
