require 'sprockets'

namespace :assets do
  desc "Compile assets."
  task :compile, [:minify] do |t, args|
    sprok_env = Sprockets::Environment.new

    sprok_env.append_path "modules/"
    out_name = "strapTK.js"

    if(args[:minify] === "true")

      require 'uglifier'

      sprok_env.js_compressor = Uglifier.new

      out_name = "strapTK.min.js"
    end

    sprok_env["manifest.js"].write_to out_name
  end
end