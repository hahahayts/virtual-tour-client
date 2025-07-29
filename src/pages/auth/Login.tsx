import { Card, CardContent } from "@/components/ui/card";

import { Form } from "./components/form";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardContent className="flex p-3">
          {/* Left side - Municipality Picture */}
          <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white rounded-l-lg">
            <div className="text-center p-8">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Municipality Portal</h2>
              <p className="text-blue-100">Secure administrative access</p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <div className="w-full max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Login to Admin Panel
                </h1>
                <p className="text-gray-600">
                  Enter your credentials to access the system
                </p>
              </div>
              <Form />
              <div className="mt-6 text-center text-sm text-gray-500">
                Protected by security protocols
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
