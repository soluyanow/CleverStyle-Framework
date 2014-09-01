// Generated by CoffeeScript 1.4.0

/**
 * @package		Photo gallery
 * @category	modules
 * @author		Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright	Copyright (c) 2013-2014, Nazar Mokrynskyi
 * @license		MIT License, see license.txt
*/


(function() {

  $(function() {
    var L, add_button, images_section;
    L = cs.Language;
    add_button = $('.cs-photo-gallery-add-images');
    if (add_button.length) {
      cs.file_upload(add_button, function(files) {
        return $.ajax('api/Photo_gallery/images', {
          cache: false,
          data: {
            files: files,
            gallery: add_button.data('gallery')
          },
          type: 'post',
          success: function(result) {
            if (!result.length || !result) {
              alert(L.photo_gallery_images_not_supported);
            }
            if (files.length !== result.length) {
              alert(L.photo_gallery_some_images_not_supported);
            }
            return location.href = 'Photo_gallery/edit_images/' + result.join(',');
          }
        });
      }, function(error) {
        return alert(error.message);
      }, null, true);
    }
    images_section = $('.cs-photo-gallery-images');
    if (images_section.length) {
      $('html, body').stop().animate({
        scrollTop: $('.cs-photo-gallery-images').offset().top - $(document).height() * .1
      });
      $('body').on('click', '.cs-photo-gallery-image-delete', function() {
        if (confirm(L.photo_gallery_sure_to_delete_image)) {
          return $.ajax('api/Photo_gallery/images/' + $(this).data('image'), {
            cache: false,
            type: 'delete',
            success: function() {
              return location.reload();
            }
          });
        }
      });
    }
    return $('.cs-photo-gallery-delete-image-checkbox').change(function() {
      var t;
      t = $(this);
      return t.parentsUntil('section').find('img, :text, textarea, p').animate({
        opacity: t.is(':checked') ? .2 : 1
      });
    });
  });

}).call(this);
