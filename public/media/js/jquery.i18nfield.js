/* by jean_b */
jQuery(function() {
        const FLAG_ROOT = '/media/img/flags/';
        const FLAG_FORMAT = '.png';

        var datas = {};

        function flushDatas(selector) {
                $(selector || ':input.i18n').each(function() {
                        datas[$(this).attr('name')][$(this).attr('languagecode')] = $(this).val();
                });
        }

        function updateLanguage() {
                $(this).siblings().removeClass('highlight');
                $(this).addClass('highlight');
                var field = $(this).parent().siblings(':input.i18n');
                flushDatas(field);
                var new_val = datas[field.attr('name')][$(this).attr('languagecode')] || '';
                field.attr('languagecode', $(this).attr('languagecode')).val(new_val);
        }

        $(':input.i18n').each(function(index) {
                var field_name = $(this).attr('name');
                var language_code = $(this).attr('languagecode');
                datas[field_name] = ($(this).val() == '') ? {} : eval('(' + $(this).val() + ')');
                $(this).val(datas[field_name][language_code] || '');

                var available_languages = $(this).attr('availablelanguages').split(' ');
                var flag_container = $('<div class="flag_container">').insertBefore(this);

                for (var language_index = 0; language_index < available_languages.length; language_index++) {
                        var src = FLAG_ROOT + available_languages[language_index] + FLAG_FORMAT;
                        flag_container.append($('<img>').attr('src', src)
                                .attr('languagecode', available_languages[language_index])
                                .click(updateLanguage)
                        );
                }
        }).parents('form').submit(function() {
                flushDatas();
                $(this).find(':input.i18n').each(function() {
                        $(this).val($.json.encode(datas[$(this).attr('name')]));
                });
        });
})