require 'sprockets'

desc "[private] Configure the sprockets environment"
task :configure_sprockets do
  @sprok_env = Sprockets::Environment.new
end

desc "Compiles, minifies, and constructs the documentation for StrapTK"
multitask :build => ["assets:compile", "assets:minify", "assets:document"] do
end

namespace :assets do
  desc "[private] Sets up the correct paths to build the StrapTK source"
  task :set_path => :configure_sprockets do
    @sprok_env.append_path "modules/"
  end

  desc "Compile assets."
  task :compile => :set_path do
    @sprok_env["manifest.js"].write_to "strapTK.js"
  end

  desc "Minify assets"
  task :minify => :set_path do
    require 'uglifier'

    @sprok_env.js_compressor = Uglifier.new
    @sprok_env["manifest.js"].write_to "strapTK.min.js"
  end

  desc "use JSDoc to generate our documentation"
  task :document do
    `jsdoc #{Dir.pwd}/modules/`
  end
end

namespace :site do
  desc "[private] Sets up the paths to build the StrapTK site"
  task :set_path => :configure_sprockets do
    @sprok_env.append_path "strapTK/"
  end

  desc "Build site files"
  task :build => :set_path do
    require "haml"
    require "tilt"

    @sprok_env.register_engine ".haml", Tilt::HamlTemplate

    @sprok_env["testing.scss"].write_to "strapTK/testing.css"
    @sprok_env["index.html.haml"].write_to "strapTK/index.html"
  end
end