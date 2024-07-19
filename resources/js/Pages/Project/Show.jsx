import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.js";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Show({ auth, project, tasks = null, queryParams = null }) {

  return (
    <>
      <Authenticated user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Project</h2>}>

        <Head title='Project'/>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900">{`Project: ${project.name}`}</div>
                {/*  <pre>*/}
                {/*  {JSON.stringify(project)}*/}
                {/*  </pre>*/}

              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-nowrap">
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created By
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Updated By
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {project.description}
                    </td>
                    <td className="px-6 py-4">
                      {project.status}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-2 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>{PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {project.updatedBy.name}
                    </td>
                    <td className="px-6 py-4">
                    {project.created_at}
                    </td>
                    <td className="px-6 py-4">
                      Actions
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              {tasks?.data && tasks.data.length > 0 &&
                <div className="pl-3 pr-3 mt-7">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Project tasks</h3>
                  <TasksTable tasks={tasks} queryParams={ queryParams } />
                </div>
              }
            </div>
          </div>
        </div>
      </Authenticated>
    </>
  );
}
