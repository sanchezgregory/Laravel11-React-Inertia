import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import {Textarea} from "@headlessui/react";
import SelectInput from "@/Components/SelectInput.jsx";


export default function Create({auth})  {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    _method: "POST",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('user.store'));
  };

  return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              Create User
            </h2>
          </div>
        }
      >
        <Head title="Create User" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                  <div className="mt-4">
                    <InputLabel
                      htmlFor="user_name"
                      value="User name"
                    />
                    <TextInput
                      id="user_name"
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
                      htmlFor="email"
                      value="User email"
                    />
                    <TextInput
                      id="email"
                      name="email"
                      value={data.email}
                      className="mt-1 block w-full text-black"
                      onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2"/>
                  </div>
                  <div className="mt-4">
                    <InputLabel
                      htmlFor="password"
                      value="User password"
                    />
                    <TextInput
                      id="password"
                      name="password"
                      value={data.password}
                      className="mt-1 block w-full text-black"
                      onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2"/>
                  </div>
                  <div className="mt-4">
                    <InputLabel
                      htmlFor="password_confirmation"
                      value="User confirm password"
                    />
                    <TextInput
                      id="password_confirmation"
                      name="password_confirmation"
                      value={data.password_confirmation}
                      className="mt-1 block w-full text-black"
                      onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} className="mt-2"/>
                  </div>
                  <div className="flex items-center justify-end mt-4">
                    <Link
                      href={route('user.index')}
                      className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                      Cancel
                    </Link>
                    <button
                      className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                      Create
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
