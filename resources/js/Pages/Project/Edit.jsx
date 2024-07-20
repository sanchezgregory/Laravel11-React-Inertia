import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {Textarea} from "@headlessui/react";
import SelectInput from "@/Components/SelectInput.jsx";


export default function Create({auth, project})  {
  const { data, setData, post, processing, errors, reset } = useForm({
    image_path: project.image_path || '',
    name: project.name || '',
    description: project.description || '',
    status: project.status || '',
    due_date: project.due_date || '',
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('project.update', project.id));
  };

  return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              Edit Project
            </h2>
          </div>
        }
      >
        <Head title="Create Project" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                  { project.image_path &&
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label htmlFor="">Current image</label>
                    <img src={ project.image_path }/>
                  </div>
                  }
                  <div>
                    <InputLabel
                      htmlFor="image_path"
                      value="Project image"
                    />
                    <TextInput
                      id="image_path"
                      type="file"
                      name="image"
                      className="mt-1 block w-full"
                      onChange={(e) => setData('image', e.target.files[0])}
                    />
                    <InputError message={errors.image} className="mt-2"/>
                  </div>
                  <div className="mt-4">
                    <InputLabel
                      htmlFor="project_name"
                      value="Project name"
                    />
                    <TextInput
                      id="project_name"
                      type="text"
                      name="name"
                      isFocused={true}
                      value={data.name}
                      className="mt-1 block w-full"
                      onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2"/>
                  </div>
                  <div className="mt-4">
                    <InputLabel
                      htmlFor="project_description"
                      value="Project description"
                    />
                    <Textarea
                      id="project_description"
                      name="description"
                      value={data.description}
                      className="mt-1 block w-full text-black"
                      onChange={(e) => setData('description', e.target.value)}
                    />
                    <InputError message={errors.description} className="mt-2"/>
                  </div>
                  <div className="mt-4">
                    <InputLabel
                      htmlFor="project_due_date"
                      value="Project deadline"
                    />
                    <TextInput
                      id="project_due_date"
                      type="date"
                      name="due_date"
                      isFocused={true}
                      value={data.name}
                      className="mt-1 block w-full"
                      onChange={(e) => setData('due_date', e.target.value)}
                    />
                    <InputError message={errors.due_date} className="mt-2"/>
                  </div>
                  <div className="mt-4">
                    <InputLabel
                      htmlFor="project_status"
                      value="Project status"
                    />
                    <SelectInput
                      id="project_status"
                      className="w-full"
                      onChange={e => setData('status', e.target.value)}
                      >
                      <option value="">Status</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </SelectInput>
                    <InputError message={errors.status} className="mt-2"/>
                  </div>
                  <div className="flex items-center justify-end mt-4">
                    <Link
                      href={route('project.index', project)}
                      className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                      Cancel
                    </Link>
                    <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
  );
}
