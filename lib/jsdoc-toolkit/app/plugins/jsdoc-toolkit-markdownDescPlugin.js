/**
 * JsDoc Toolkit Plugin to interpret @desc tags as markdown markup.
 * 
 * This Plugin uses the Showdown Library to apply markdown on @desc tags.
 * You need to download this plugin to the app/plugins directory of jsdoc.
 * You need to put the showdown.js in the app directory of jsdoc.
 * 
 * > https://github.com/coreyti/showdown/raw/master/src/showdown.js
 * 
 * @author Matthias -apoc- Hecker <apoc@sixserv.org> [http://apoc.cc/]
 */
try {
  IO.include("showdown.js");
}
catch(e){
  LOG.error('If you want to use markdownDesc you need the showdown library.'+
    ' Get it here: https://github.com/coreyti/showdown (download it to app/)');
}

var markdownDescPlugin = {
  onDocCommentTags: function(doc) {
    for(var i in doc.tags) {
      var tag = doc.tags[i];
      
      if((tag.title == 'desc' || tag.title == 'param' || tag.title == 'class' /*|| tag.title == 'see'*/) && tag.desc != '') {
        
        //tag.desc = tag.desc.split(/  +\n/g).join(" <br />\n");
        //LOG.inform('[Plugin:markdownDesc] apply markdown on desc: '+tag.desc.match(/ +\n/g));
        
        var converter = new Showdown.converter();
        tag.desc = converter.makeHtml(tag.desc);
      }
    }
  }
};

JSDOC.PluginManager.registerPlugin("JSDOC.markdownDescPlugin", markdownDescPlugin);
