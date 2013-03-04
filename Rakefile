require 'sprockets'

task :configure_sprockets do
  @sprok_env = Sprockets::Environment.new
  @sprok_env.append_path "modules/"
end

namespace :assets do
  desc "Compile assets."
  task :compile => :configure_sprockets do
    @sprok_env["manifest.js"].write_to "strapTK.js"
  end

  desc "Minify assets"
  task :minify => :configure_sprockets do
    require 'uglifier'

    @sprok_env.js_compressor = Uglifier.new
    @sprok_env["manifest.js"].write_to "strapTK.min.js"
  end
end