import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.js";
import Pagination from "@/Components/Pagination.jsx";
import {router, usePage} from "@inertiajs/react";

export default function TasksTable({ tasks,  queryParams = null }) {

  queryParams = queryParams || {};
  const { url } = usePage();
  const handleRoute = () => {
    const isProject = url.startsWith('/project')
    const isTask = url.startsWith('/task')
    const routeName = isProject ? 'project.show' : isTask ? 'task.index' : 'task.index';
    const projectId = isProject ? url.split('/').pop() : null;
    const routeParams = projectId ? { project: projectId, ...queryParams } : queryParams;
    const routeNameComplete = ''
    if (isProject) {
      return router.get(route(routeName, { project: projectId }), routeParams);
    } else {
      return router.get(route(routeName), routeParams);
    }
  }
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    handleRoute();
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
    handleRoute();
  }

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-nowrap">
            <TableHeading
              name="id"
              sort_direction={queryParams.sort_direction}
              sort_field={queryParams.sort_field}
              sortChanged={sortChanged}>
              ID
            </TableHeading>

            <th className="px-3 py-2">Image</th>
            <TableHeading
              name="name"
              sort_direction={queryParams.sort_direction}
              sort_field={queryParams.sort_field}
              sortChanged={sortChanged}>
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
              <TextInput className="w-full" placeholder="task name" defaultValue={queryParams.name}
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
          {tasks.data.map((task) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
              <th className="px-3 py-2">{task.id}</th>
              <td className="px-3 py-2">
                <img src={task.image_path} alt="" style={{width: '150px', height: '100px'}}/>
              </td>
              <td className="px-3 py-2">{task.name}</td>
              <td className="px-3 py-2">
                      <span
                        className={`px-3 py-2 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>{TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
              </td>
              <td className="px-3 py-2">{task.created_at}</td>
              <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
              <td className="px-3 py-2">{task.createdBy.name}</td>
              <td className="px-3 py-2 text-align-right">
                <a href={route('task.edit', task.id)}
                   className="text-blue-500 hover:text-blue-700 mr-1">Edit</a>
                <a href={route('task.edit', task.id)}
                   className="text-blue-500 hover:text-blue-700">Delete</a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links}/>
    </>
  );
}
