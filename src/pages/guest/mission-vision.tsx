import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Flag } from "lucide-react";

const MissionAndVision = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="text-center mb-8 sm:mb-12 animate-in slide-in-from-top-5 duration-300">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Mission, Vision and Goal
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          Discover what drives us forward and the future we're building together
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col space-y-6 sm:space-y-8">
        {/* Top Row - Mission and Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
          {/* Mission Card */}
          <Card
            className="group hover:shadow-lg transition-all border-l-4 border-l-blue-500 hover:border-l-blue-600 animate-in slide-in-from-left-5 duration-300"
            style={{ animationDelay: "100ms" }}
          >
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                To create a positive environment for sustainable growth through
                the provision of effective services, and sound local governance
                that will improve the quality of life of its citizenry.
              </p>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card
            className="group hover:shadow-lg transition-all border-l-4 border-l-purple-500 hover:border-l-purple-600 animate-in slide-in-from-right-5 duration-300"
            style={{ animationDelay: "150ms" }}
          >
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                TUBIGON is a prime eco-cultural tourism destination and
                economically vibrant trading center, and productive
                agro-industrial municipality in the region led by competent,
                dynamic, and committed leaders, with family-oriented, God
                loving, and empowered people sustainably managing the
                environment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row - Goal (Centered) */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <Card
              className="group hover:shadow-lg transition-all border-l-4 border-l-purple-500 hover:border-l-purple-600 animate-in slide-in-from-bottom-5 duration-300"
              style={{ animationDelay: "200ms" }}
            >
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center gap-3 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  Attained sound and healthy environment. Secured the life,
                  properties and natural resources. Improved quality of life of
                  the inhabitants in the municipality. Improved social basic
                  services. Increased economic productivity. Ensured adequate
                  infrastructure facilities: e.g. water, transport,
                  communication, power & etc. Improved fiscal and local
                  governance performance of LGU.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionAndVision;
