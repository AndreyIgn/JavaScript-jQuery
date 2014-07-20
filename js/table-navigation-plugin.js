(function ($) {
    'use strict';
    $.fn.attachKeyboardNavigation = function (options) {
        var settings = $.extend({}, $.fn.attachKeyboardNavigation.defaults, options);
        var table = this;
        var handlingKeys = Object.keys(settings).map(function (key) { return settings[key]; });
        
        table.keydown(function (event) {
            var pressedKey = event.keyCode;
            if ($.inArray(pressedKey, handlingKeys) === -1) {
                return;
            }
            var currentCell = $(event.target);
            var rowCount = table.find('tr').length;
            var colCount = table.find('tr:first').find('td').length;
            var rowIndex = currentCell.parents('tr:first').get(0).rowIndex;
            var colIndex = currentCell.parents('td:first').get(0).cellIndex;

            if (pressedKey === settings.left) {
                if (colIndex === 0) {
                    rowIndex = rowIndex === 0 ? rowCount - 1 : rowIndex - 1;
                    colIndex = colCount - 1;
                } else {
                    colIndex--;
                }
            }
            if (pressedKey === settings.up) {
                rowIndex = rowIndex === 0 ? rowCount - 1 : rowIndex - 1;
            }
            if (pressedKey === settings.right) {
                if (colIndex === colCount - 1) {
                    colIndex = 0;
                    rowIndex = rowIndex === rowCount - 1 ? 0 : rowIndex + 1;
                } else {
                    colIndex++;
                }
            }
            if (pressedKey === settings.down) {
                rowIndex = rowIndex === rowCount - 1 ? 0 : rowIndex + 1;
            }
            focusTableCell(table, rowIndex, colIndex);
        });
        return this;
    };
    $.fn.attachKeyboardNavigation.defaults = { left: 37, up: 38, right: 39, down: 40 };
    function focusTableCell(table, rowIndex, colIndex) {
        getTableCell(table, rowIndex, colIndex).find('input[type=text]').focus();
    }
    function getTableCell(table, rowIndex, colIndex) {
        var cellSelector = 'tr:nth-of-type(' + (rowIndex + 1) + ') td:nth-of-type(' + (colIndex + 1) + ')';
        return table.find(cellSelector);
    }
})(jQuery);