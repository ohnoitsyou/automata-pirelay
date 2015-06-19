"use strict";
var express = require("express");
var debug = require("debug")("pirelay");
var path = require("path");
var fs = require("fs");

var Pirelay = function() {
  this.version = "0.1.0";
  this.router = express.Router();
  this.viewsFolder = __dirname + "/views";
  this.stylesFolder = __dirname + "/css";
  this.scriptsFolder = __dirname + "/js";

  this.load = function(options) {
    debug("[Load] Starting");
    debug("[Load] Finishing");
  };
  this.initilize = function() {
    debug("[Initilize] Starting");
    debug("[Initilize] Finishing");
    return true;
  };
  /* Here is where you define your end points.
   * They will be accessable at /api/$plugin-folder-name/$endpoint
   * As part of the res you have access to the application renderer.
   * It is accessable as: res.locals.app.render
   * I am using express-hbs, you should pass {layout: null} as an option
   *   to the renderer to prevent it from adding your content to the default layout
   */
  this.loadRoutes = function() {
    debug("[LoadRoutes] Starting");
    this.router.get("/", function(req, res) {
      res.send("Relay!");
    });
    this.router.get("/on", function(req, res) {
      res.send("Relay on!");
    });
    debug("[LoadRoutes] Finishing");
    return this.router;
  };
  /*
   * You should return paths to folders that will contain static assets
   *   ie. your javascript, images, css etc.
   */
  this.registerStaticFolders = function(pluginDir) {
    debug("[RegisterStatics] Starting");
    var folders = [];
    folders = folders.map(function(folder) {
      return path.basename(pluginDir) + "/" + path.relative(pluginDir, folder);
    });
    debug("[RegisterStatics] Finishing");
    return folders;
  };
  /*
   * This one can be done one of two ways, you can let the function discover all your files
   * or you can define them.
   */
  this.registerStyles = function(pluginDir) {
    debug("[RegisterStyles] Starting");
    var files = [], fileList = [],
        filePath = path.join(path.basename(pluginDir), path.relative(pluginDir, this.stylesFolder));
    try {
      var fileList = fs.readdirSync(this.stylesFolder);
    } catch(e) {
      debug("[RegisterStyles] Problem: %s", e);
    }
    files = fileList.map(function(file) {
      debug("[RegisterStyles] Found file: %s", file);
      return path.join(filePath, file);
    });
    debug("[RegisterStyles] Finishing");
    return files;
  };
  this.registerScripts = function(pluginDir) {
    debug("[RegisterScripts] Starting");
    var files = [], fileList = [],
        filePath = path.join(path.basename(pluginDir), path.relative(pluginDir, this.scriptsFolder));
    try {
      var fileList = fs.readdirSync(this.scriptsFolder);
    } catch(e) {
      debug("[RegisterScripts] Problem: %s", e);
    }
    files = fileList.map(function(file) {
      debug("[RegisterScripts] Found file: %s", file);
      return path.join(filePath, file);
    });
    debug("[RegisterScripts] Finishing");
    return files;
  };
}

module.exports = Pirelay;
