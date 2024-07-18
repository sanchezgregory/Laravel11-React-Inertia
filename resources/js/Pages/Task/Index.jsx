import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router} from "@inertiajs/react";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Index({ auth, tasks, queryParams = null }) {

  queryParams = queryParams || {};




  return (
    <>
      <Authenticated user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>}>

        <Head title="tasks"/>

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900">tasks</div>
              {/*<pre>*/}
              {/*   {JSON.stringify(tasks)}*/}
              {/*</pre>*/}
              <TasksTable tasks={tasks} queryParams={queryParams} />
            </div>
          </div>
        </div>

      </Authenticated>
    </>
  );
}
