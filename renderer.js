"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b ||= {})
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/csv-writer/dist/lib/csv-stringifiers/abstract.js
var require_abstract = __commonJS({
  "node_modules/csv-writer/dist/lib/csv-stringifiers/abstract.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DEFAULT_RECORD_DELIMITER = "\n";
    var VALID_RECORD_DELIMITERS = [DEFAULT_RECORD_DELIMITER, "\r\n"];
    var CsvStringifier = (
      /** @class */
      function() {
        function CsvStringifier2(fieldStringifier, recordDelimiter) {
          if (recordDelimiter === void 0) {
            recordDelimiter = DEFAULT_RECORD_DELIMITER;
          }
          this.fieldStringifier = fieldStringifier;
          this.recordDelimiter = recordDelimiter;
          _validateRecordDelimiter(recordDelimiter);
        }
        CsvStringifier2.prototype.getHeaderString = function() {
          var headerRecord = this.getHeaderRecord();
          return headerRecord ? this.joinRecords([this.getCsvLine(headerRecord)]) : null;
        };
        CsvStringifier2.prototype.stringifyRecords = function(records) {
          var _this = this;
          var csvLines = Array.from(records, function(record) {
            return _this.getCsvLine(_this.getRecordAsArray(record));
          });
          return this.joinRecords(csvLines);
        };
        CsvStringifier2.prototype.getCsvLine = function(record) {
          var _this = this;
          return record.map(function(fieldValue) {
            return _this.fieldStringifier.stringify(fieldValue);
          }).join(this.fieldStringifier.fieldDelimiter);
        };
        CsvStringifier2.prototype.joinRecords = function(records) {
          return records.join(this.recordDelimiter) + this.recordDelimiter;
        };
        return CsvStringifier2;
      }()
    );
    exports.CsvStringifier = CsvStringifier;
    function _validateRecordDelimiter(delimiter) {
      if (VALID_RECORD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error("Invalid record delimiter `" + delimiter + "` is specified");
      }
    }
  }
});

// node_modules/csv-writer/dist/lib/csv-stringifiers/array.js
var require_array = __commonJS({
  "node_modules/csv-writer/dist/lib/csv-stringifiers/array.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var abstract_1 = require_abstract();
    var ArrayCsvStringifier = (
      /** @class */
      function(_super) {
        __extends(ArrayCsvStringifier2, _super);
        function ArrayCsvStringifier2(fieldStringifier, recordDelimiter, header) {
          var _this = _super.call(this, fieldStringifier, recordDelimiter) || this;
          _this.header = header;
          return _this;
        }
        ArrayCsvStringifier2.prototype.getHeaderRecord = function() {
          return this.header;
        };
        ArrayCsvStringifier2.prototype.getRecordAsArray = function(record) {
          return record;
        };
        return ArrayCsvStringifier2;
      }(abstract_1.CsvStringifier)
    );
    exports.ArrayCsvStringifier = ArrayCsvStringifier;
  }
});

// node_modules/csv-writer/dist/lib/field-stringifier.js
var require_field_stringifier = __commonJS({
  "node_modules/csv-writer/dist/lib/field-stringifier.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var DEFAULT_FIELD_DELIMITER = ",";
    var VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ";"];
    var FieldStringifier = (
      /** @class */
      function() {
        function FieldStringifier2(fieldDelimiter) {
          this.fieldDelimiter = fieldDelimiter;
        }
        FieldStringifier2.prototype.isEmpty = function(value) {
          return typeof value === "undefined" || value === null || value === "";
        };
        FieldStringifier2.prototype.quoteField = function(field) {
          return '"' + field.replace(/"/g, '""') + '"';
        };
        return FieldStringifier2;
      }()
    );
    exports.FieldStringifier = FieldStringifier;
    var DefaultFieldStringifier = (
      /** @class */
      function(_super) {
        __extends(DefaultFieldStringifier2, _super);
        function DefaultFieldStringifier2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        DefaultFieldStringifier2.prototype.stringify = function(value) {
          if (this.isEmpty(value))
            return "";
          var str = String(value);
          return this.needsQuote(str) ? this.quoteField(str) : str;
        };
        DefaultFieldStringifier2.prototype.needsQuote = function(str) {
          return str.includes(this.fieldDelimiter) || str.includes("\n") || str.includes('"');
        };
        return DefaultFieldStringifier2;
      }(FieldStringifier)
    );
    var ForceQuoteFieldStringifier = (
      /** @class */
      function(_super) {
        __extends(ForceQuoteFieldStringifier2, _super);
        function ForceQuoteFieldStringifier2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        ForceQuoteFieldStringifier2.prototype.stringify = function(value) {
          return this.isEmpty(value) ? "" : this.quoteField(String(value));
        };
        return ForceQuoteFieldStringifier2;
      }(FieldStringifier)
    );
    function createFieldStringifier(fieldDelimiter, alwaysQuote) {
      if (fieldDelimiter === void 0) {
        fieldDelimiter = DEFAULT_FIELD_DELIMITER;
      }
      if (alwaysQuote === void 0) {
        alwaysQuote = false;
      }
      _validateFieldDelimiter(fieldDelimiter);
      return alwaysQuote ? new ForceQuoteFieldStringifier(fieldDelimiter) : new DefaultFieldStringifier(fieldDelimiter);
    }
    exports.createFieldStringifier = createFieldStringifier;
    function _validateFieldDelimiter(delimiter) {
      if (VALID_FIELD_DELIMITERS.indexOf(delimiter) === -1) {
        throw new Error("Invalid field delimiter `" + delimiter + "` is specified");
      }
    }
  }
});

// node_modules/csv-writer/dist/lib/lang/object.js
var require_object = __commonJS({
  "node_modules/csv-writer/dist/lib/lang/object.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isObject = function(value) {
      return Object.prototype.toString.call(value) === "[object Object]";
    };
  }
});

// node_modules/csv-writer/dist/lib/csv-stringifiers/object.js
var require_object2 = __commonJS({
  "node_modules/csv-writer/dist/lib/csv-stringifiers/object.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var abstract_1 = require_abstract();
    var object_1 = require_object();
    var ObjectCsvStringifier = (
      /** @class */
      function(_super) {
        __extends(ObjectCsvStringifier2, _super);
        function ObjectCsvStringifier2(fieldStringifier, header, recordDelimiter, headerIdDelimiter) {
          var _this = _super.call(this, fieldStringifier, recordDelimiter) || this;
          _this.header = header;
          _this.headerIdDelimiter = headerIdDelimiter;
          return _this;
        }
        ObjectCsvStringifier2.prototype.getHeaderRecord = function() {
          if (!this.isObjectHeader)
            return null;
          return this.header.map(function(field) {
            return field.title;
          });
        };
        ObjectCsvStringifier2.prototype.getRecordAsArray = function(record) {
          var _this = this;
          return this.fieldIds.map(function(fieldId) {
            return _this.getNestedValue(record, fieldId);
          });
        };
        ObjectCsvStringifier2.prototype.getNestedValue = function(obj, key) {
          if (!this.headerIdDelimiter)
            return obj[key];
          return key.split(this.headerIdDelimiter).reduce(function(subObj, keyPart) {
            return (subObj || {})[keyPart];
          }, obj);
        };
        Object.defineProperty(ObjectCsvStringifier2.prototype, "fieldIds", {
          get: function() {
            return this.isObjectHeader ? this.header.map(function(column) {
              return column.id;
            }) : this.header;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ObjectCsvStringifier2.prototype, "isObjectHeader", {
          get: function() {
            return object_1.isObject(this.header && this.header[0]);
          },
          enumerable: true,
          configurable: true
        });
        return ObjectCsvStringifier2;
      }(abstract_1.CsvStringifier)
    );
    exports.ObjectCsvStringifier = ObjectCsvStringifier;
  }
});

// node_modules/csv-writer/dist/lib/csv-stringifier-factory.js
var require_csv_stringifier_factory = __commonJS({
  "node_modules/csv-writer/dist/lib/csv-stringifier-factory.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var array_1 = require_array();
    var field_stringifier_1 = require_field_stringifier();
    var object_1 = require_object2();
    var CsvStringifierFactory = (
      /** @class */
      function() {
        function CsvStringifierFactory2() {
        }
        CsvStringifierFactory2.prototype.createArrayCsvStringifier = function(params) {
          var fieldStringifier = field_stringifier_1.createFieldStringifier(params.fieldDelimiter, params.alwaysQuote);
          return new array_1.ArrayCsvStringifier(fieldStringifier, params.recordDelimiter, params.header);
        };
        CsvStringifierFactory2.prototype.createObjectCsvStringifier = function(params) {
          var fieldStringifier = field_stringifier_1.createFieldStringifier(params.fieldDelimiter, params.alwaysQuote);
          return new object_1.ObjectCsvStringifier(fieldStringifier, params.header, params.recordDelimiter, params.headerIdDelimiter);
        };
        return CsvStringifierFactory2;
      }()
    );
    exports.CsvStringifierFactory = CsvStringifierFactory;
  }
});

// node_modules/csv-writer/dist/lib/lang/promise.js
var require_promise = __commonJS({
  "node_modules/csv-writer/dist/lib/lang/promise.js"(exports) {
    "use strict";
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    function promisify(fn) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return new Promise(function(resolve, reject) {
          var nodeCallback = function(err, result) {
            if (err)
              reject(err);
            else
              resolve(result);
          };
          fn.apply(null, __spreadArrays(args, [nodeCallback]));
        });
      };
    }
    exports.promisify = promisify;
  }
});

// node_modules/csv-writer/dist/lib/file-writer.js
var require_file_writer = __commonJS({
  "node_modules/csv-writer/dist/lib/file-writer.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var promise_1 = require_promise();
    var fs_1 = require("fs");
    var writeFilePromise = promise_1.promisify(fs_1.writeFile);
    var DEFAULT_ENCODING = "utf8";
    var FileWriter = (
      /** @class */
      function() {
        function FileWriter2(path2, append, encoding) {
          if (encoding === void 0) {
            encoding = DEFAULT_ENCODING;
          }
          this.path = path2;
          this.append = append;
          this.encoding = encoding;
        }
        FileWriter2.prototype.write = function(string) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, writeFilePromise(this.path, string, this.getWriteOption())];
                case 1:
                  _a.sent();
                  this.append = true;
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        FileWriter2.prototype.getWriteOption = function() {
          return {
            encoding: this.encoding,
            flag: this.append ? "a" : "w"
          };
        };
        return FileWriter2;
      }()
    );
    exports.FileWriter = FileWriter;
  }
});

// node_modules/csv-writer/dist/lib/csv-writer.js
var require_csv_writer = __commonJS({
  "node_modules/csv-writer/dist/lib/csv-writer.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var file_writer_1 = require_file_writer();
    var DEFAULT_INITIAL_APPEND_FLAG = false;
    var CsvWriter = (
      /** @class */
      function() {
        function CsvWriter2(csvStringifier, path2, encoding, append) {
          if (append === void 0) {
            append = DEFAULT_INITIAL_APPEND_FLAG;
          }
          this.csvStringifier = csvStringifier;
          this.append = append;
          this.fileWriter = new file_writer_1.FileWriter(path2, this.append, encoding);
        }
        CsvWriter2.prototype.writeRecords = function(records) {
          return __awaiter(this, void 0, void 0, function() {
            var recordsString, writeString;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  recordsString = this.csvStringifier.stringifyRecords(records);
                  writeString = this.headerString + recordsString;
                  return [4, this.fileWriter.write(writeString)];
                case 1:
                  _a.sent();
                  this.append = true;
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        Object.defineProperty(CsvWriter2.prototype, "headerString", {
          get: function() {
            var headerString = !this.append && this.csvStringifier.getHeaderString();
            return headerString || "";
          },
          enumerable: true,
          configurable: true
        });
        return CsvWriter2;
      }()
    );
    exports.CsvWriter = CsvWriter;
  }
});

// node_modules/csv-writer/dist/lib/csv-writer-factory.js
var require_csv_writer_factory = __commonJS({
  "node_modules/csv-writer/dist/lib/csv-writer-factory.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var csv_writer_1 = require_csv_writer();
    var CsvWriterFactory = (
      /** @class */
      function() {
        function CsvWriterFactory2(csvStringifierFactory) {
          this.csvStringifierFactory = csvStringifierFactory;
        }
        CsvWriterFactory2.prototype.createArrayCsvWriter = function(params) {
          var csvStringifier = this.csvStringifierFactory.createArrayCsvStringifier({
            header: params.header,
            fieldDelimiter: params.fieldDelimiter,
            recordDelimiter: params.recordDelimiter,
            alwaysQuote: params.alwaysQuote
          });
          return new csv_writer_1.CsvWriter(csvStringifier, params.path, params.encoding, params.append);
        };
        CsvWriterFactory2.prototype.createObjectCsvWriter = function(params) {
          var csvStringifier = this.csvStringifierFactory.createObjectCsvStringifier({
            header: params.header,
            fieldDelimiter: params.fieldDelimiter,
            recordDelimiter: params.recordDelimiter,
            headerIdDelimiter: params.headerIdDelimiter,
            alwaysQuote: params.alwaysQuote
          });
          return new csv_writer_1.CsvWriter(csvStringifier, params.path, params.encoding, params.append);
        };
        return CsvWriterFactory2;
      }()
    );
    exports.CsvWriterFactory = CsvWriterFactory;
  }
});

// node_modules/csv-writer/dist/index.js
var require_dist = __commonJS({
  "node_modules/csv-writer/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var csv_stringifier_factory_1 = require_csv_stringifier_factory();
    var csv_writer_factory_1 = require_csv_writer_factory();
    var csvStringifierFactory = new csv_stringifier_factory_1.CsvStringifierFactory();
    var csvWriterFactory = new csv_writer_factory_1.CsvWriterFactory(csvStringifierFactory);
    exports.createArrayCsvStringifier = function(params) {
      return csvStringifierFactory.createArrayCsvStringifier(params);
    };
    exports.createObjectCsvStringifier = function(params) {
      return csvStringifierFactory.createObjectCsvStringifier(params);
    };
    exports.createArrayCsvWriter = function(params) {
      return csvWriterFactory.createArrayCsvWriter(params);
    };
    exports.createObjectCsvWriter = function(params) {
      return csvWriterFactory.createObjectCsvWriter(params);
    };
  }
});

// src/renderer.ts
var import_fs = __toESM(require("fs"));

// src/csv/formats/emars/headers.ts
var MAX_DEDUCTION_COLUMNS = 22;
var MAX_FRINGE_COLUMNS = 10;
var createDeductionColumns = (parsedReport) => {
  const allDeductions = parsedReport.projects.map((project) => project.employeeChecks.map((check) => check.deductions)).flat(2);
  let uniqueDescriptions = [
    ...new Set(allDeductions.map(({ description }) => description))
  ];
  uniqueDescriptions = uniqueDescriptions.filter((description) => !description.startsWith("CHS-")).concat(["CHS"]);
  uniqueDescriptions.sort();
  if (uniqueDescriptions.length > MAX_DEDUCTION_COLUMNS) {
    throw new Error(
      `There are ${uniqueDescriptions.length} unique deduction descriptions (e.g. "DENT").
      This exceeds the max (${MAX_DEDUCTION_COLUMNS}) allowed by EMARS.
      Descriptions parsed:
      ${JSON.stringify(uniqueDescriptions)}`
    );
  }
  return uniqueDescriptions.map((description) => {
    return {
      id: description,
      title: `Ded ${description}`
    };
  });
};
var createFringeColumns = (parsedReport) => {
  const allFringes = parsedReport.projects.map((project) => project.employeeChecks.map((check) => check.fringeDetail)).flat(2);
  const uniqueDescriptions = [
    ...new Set(allFringes.map(({ description }) => description))
  ];
  if (uniqueDescriptions.length > MAX_FRINGE_COLUMNS) {
    throw new Error(
      `There are ${uniqueDescriptions.length} unique fringe descriptions (e.g. "$30000").
      This exceeds the max (${MAX_FRINGE_COLUMNS}) allowed by EMARS.
      Descriptions parsed:
      ${JSON.stringify(uniqueDescriptions)}`
    );
  }
  return uniqueDescriptions.map((description) => {
    return {
      id: description,
      title: `Fringe ${description}`
    };
  });
};
var createHeaders = (deductionColumns, fringeColumns) => [
  { id: "ssn", title: "SSN" },
  { id: "firstName", title: "First Name" },
  { id: "lastName", title: "Last Name" },
  {
    id: "sex",
    title: "Sex"
  },
  {
    id: "ethnicity",
    title: "Ethnicity"
  },
  {
    id: "addressLine1",
    title: "Address Line 1"
  },
  {
    id: "TODO: Is this address line 2? City? Something else?",
    title: ""
  },
  {
    id: "state",
    title: "State"
  },
  {
    id: "zip",
    title: "ZIP"
  },
  {
    id: "workClass",
    title: "WorkClass"
  },
  {
    id: "appLevel",
    title: "App. Level"
  },
  {
    id: "appPercent",
    title: "App Percent"
  },
  {
    id: "straightTime1",
    title: "ST1"
  },
  {
    id: "straightTime2",
    title: "ST2"
  },
  {
    id: "straightTime3",
    title: "ST3"
  },
  {
    id: "straightTime4",
    title: "ST4"
  },
  {
    id: "straightTime5",
    title: "ST5"
  },
  {
    id: "straightTime6",
    title: "ST6"
  },
  {
    id: "straightTime7",
    title: "ST7"
  },
  {
    id: "overtime1",
    title: "OT1"
  },
  {
    id: "overtime2",
    title: "OT2"
  },
  {
    id: "overtime3",
    title: "OT3"
  },
  {
    id: "overtime4",
    title: "OT4"
  },
  {
    id: "overtime5",
    title: "OT5"
  },
  {
    id: "overtime6",
    title: "OT6"
  },
  {
    id: "overtime7",
    title: "OT7"
  },
  {
    id: "doubleTime1",
    title: "DT1"
  },
  {
    id: "doubleTime2",
    title: "DT2"
  },
  {
    id: "doubleTime3",
    title: "DT3"
  },
  {
    id: "doubleTime4",
    title: "DT4"
  },
  {
    id: "doubleTime5",
    title: "DT5"
  },
  {
    id: "doubleTime6",
    title: "DT6"
  },
  {
    id: "doubleTime7",
    title: "DT7"
  },
  {
    id: "doubleTimePayRate",
    title: "Doubletime Pay Rate"
  },
  {
    id: "overtimePayRate",
    title: "Overtime Pay Rate"
  },
  {
    id: "straightTimePayRate",
    title: "Regular Pay Rate"
  },
  {
    id: "doubleTimeCashFringe",
    title: "DT Cash Fringe"
  },
  {
    id: "overtimeCashFringe",
    title: "OT Rate Cash Fringe"
  },
  {
    id: "straightTimeCashFringe",
    title: "Reg. Rate Cash Fringe"
  },
  {
    id: "federalWitholding",
    title: "FWH"
  },
  {
    id: "fica",
    title: "FICA"
  },
  {
    id: "medicare",
    title: "Medicare"
  },
  {
    id: "stateTax",
    title: "StateTax"
  },
  {
    id: "localTax1",
    title: "Local Tax1"
  },
  {
    id: "localTax2",
    title: "Local Tax2"
  },
  ...deductionColumns,
  {
    id: "exemptions",
    title: "Exemptions"
  },
  {
    id: "checkNumber",
    title: "Check Number"
  },
  {
    id: "grossPay",
    title: "Gross Pay"
  },
  {
    id: "netPay",
    title: "Net Pay"
  },
  ...fringeColumns
];

// src/utils.ts
var parseNumber = (str) => {
  var _a;
  const trimmed = (_a = str == null ? void 0 : str.trim()) != null ? _a : "";
  return trimmed ? Number(trimmed.replace(/[,-]/g, "")) : void 0;
};
var formatToNDecimalPlaces = (value, n = 2) => value ? value.toFixed(n) : "";

// src/csv/formats/emars/index.ts
var toStaticEmarsRow = (employeeCheck) => ({
  ssn: employeeCheck.employee.ssn,
  firstName: employeeCheck.employee.firstName,
  lastName: employeeCheck.employee.lastName,
  sex: employeeCheck.employee.gender === "Male" ? "M" : "F",
  ethnicity: employeeCheck.employee.race,
  addressLine1: employeeCheck.employee.address.streetAddress,
  state: employeeCheck.employee.address.state,
  zip: employeeCheck.employee.address.zip,
  workClass: employeeCheck.payClass,
  appLevel: "",
  appPercent: "",
  straightTime1: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.sunday
  ),
  straightTime2: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.monday
  ),
  straightTime3: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.tuesday
  ),
  straightTime4: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.wednesday
  ),
  straightTime5: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.thursday
  ),
  straightTime6: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.friday
  ),
  straightTime7: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.saturday
  ),
  overtime1: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.sunday
  ),
  overtime2: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.monday
  ),
  overtime3: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.tuesday
  ),
  overtime4: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.wednesday
  ),
  overtime5: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.thursday
  ),
  overtime6: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.friday
  ),
  overtime7: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.saturday
  ),
  doubleTime1: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.sunday
  ),
  doubleTime2: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.monday
  ),
  doubleTime3: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.tuesday
  ),
  doubleTime4: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.wednesday
  ),
  doubleTime5: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.thursday
  ),
  doubleTime6: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.friday
  ),
  doubleTime7: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.saturday
  ),
  doubleTimePayRate: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.payRate,
    3
  ),
  overtimePayRate: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.payRate,
    3
  ),
  straightTimePayRate: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.payRate,
    3
  ),
  federalWitholding: formatToNDecimalPlaces(
    employeeCheck.taxes.federal.federalIncomeTax,
    3
  ),
  fica: formatToNDecimalPlaces(employeeCheck.taxes.federal.fica, 3),
  medicare: formatToNDecimalPlaces(employeeCheck.taxes.federal.medicare, 3),
  stateTax: formatToNDecimalPlaces(employeeCheck.taxes.state, 3),
  localTax1: formatToNDecimalPlaces(employeeCheck.taxes.local, 3),
  exemptions: formatToNDecimalPlaces(
    employeeCheck.taxes.federal.federalExemptions,
    0
  ),
  grossPay: formatToNDecimalPlaces(employeeCheck.totalGross, 3),
  netPay: formatToNDecimalPlaces(employeeCheck.net, 3)
});
var toRowDeductions = ({ deductions }, deductionColumns) => {
  const deductionsObj = {};
  for (const column of deductionColumns) {
    const columnDeductions = column.id === "CHS" ? deductions.filter(
      (deduction) => deduction.description.startsWith("CHS-")
    ) : deductions.filter((deduction) => deduction.description === column.id);
    const mergedValue = columnDeductions.reduce(
      (acc, columnDeduction) => {
        var _a;
        return acc + ((_a = columnDeduction.amount) != null ? _a : 0);
      },
      0
    );
    deductionsObj[column.id] = formatToNDecimalPlaces(mergedValue, 3);
  }
  return deductionsObj;
};
var toRowFringes = ({ fringeDetail }, fringeColumns) => {
  var _a;
  const fringesObj = {};
  for (const column of fringeColumns) {
    fringesObj[column.id] = (_a = fringeDetail.find(
      ({ description }) => description === column.id
    )) == null ? void 0 : _a.amount;
  }
  return fringesObj;
};
var getEmarsFormat = (parsedReport) => {
  const employeeChecks = parsedReport.projects.map((project) => project.employeeChecks).flat();
  const deductionColumns = createDeductionColumns(parsedReport);
  const fringeColumns = createFringeColumns(parsedReport);
  return {
    label: "emars",
    header: createHeaders(deductionColumns, fringeColumns),
    toRows: () => {
      return employeeChecks.map((employeeCheck) => {
        const staticRow = toStaticEmarsRow(employeeCheck);
        return __spreadValues(__spreadValues(__spreadValues({}, staticRow), toRowDeductions(employeeCheck, deductionColumns)), toRowFringes(employeeCheck, fringeColumns));
      });
    }
  };
};

// src/renderer.ts
var import_electron = require("electron");

// src/employeeCheck/deductionsAndReimbursements.ts
var parseDeductionsAndReimbursements = ({
  allLines,
  columnStart,
  columnEnd
}) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));
  const deductions = [];
  const reimbursements = [];
  for (const line of lines) {
    const deductionMatches = line.matchAll(/(DED:\d{3}) (\S+) (\d+\.\d{2})/g);
    for (const match of deductionMatches) {
      deductions.push({
        code: match[1],
        description: match[2],
        amount: parseNumber(match[3])
      });
    }
    const reimbursementMatches = line.matchAll(
      /(RMB:\d{3}) (\S+) (\d+\.\d{2})/g
    );
    for (const match of reimbursementMatches) {
      reimbursements.push({
        code: match[1],
        description: match[2],
        amount: parseNumber(match[3])
      });
    }
  }
  return {
    deductions,
    reimbursements
  };
};

// src/employeeCheck/employee.ts
var parseEmployee = ({
  allLines,
  columnStart,
  columnEnd
}) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));
  const nameLine = lines[2];
  const [lastName, firstNameAndInitial] = nameLine.split(",");
  const [firstName, middleInitial] = firstNameAndInitial.trim().split(" ");
  const addressLine = lines[3];
  const streetAddress = addressLine.trim();
  const cityStateZipLine = lines[4];
  const [city, stateZip] = cityStateZipLine.split(", ");
  const [state, zip] = stateZip.split(" ");
  const ssnGenderLine = lines[5];
  const ssn = ssnGenderLine.slice(0, 11).trim();
  const gender = ssnGenderLine.slice(12, 16).trim();
  const raceLine = lines[6];
  const race = raceLine.trim();
  return {
    firstName,
    lastName,
    middleInitial,
    ssn,
    race,
    gender,
    address: {
      city,
      state,
      streetAddress,
      zip
    }
  };
};

// src/employeeCheck/federalTaxes.ts
var parseFederalTaxes = ({
  allLines,
  columnStart,
  columnEnd
}) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));
  return {
    federalIncomeTax: parseNumber(lines[3]),
    fica: parseNumber(lines[4]),
    medicare: parseNumber(lines[5]),
    federalExemptions: parseNumber(lines[6])
  };
};

// src/employeeCheck/fringeDetail.ts
var parseFringeDetail = ({
  allLines,
  columnStart,
  columnEnd
}) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd).trim()).slice(3);
  return lines.filter((line) => /^([$a-zA-Z0-9\s-]+)\s+(\d+\.\d{2})$/.test(line)).map((line) => {
    var _a;
    const [description, amount] = line.split(/\s+(?=\d)/);
    return {
      description: description.trim(),
      amount: (_a = parseNumber(amount)) != null ? _a : 0
    };
  });
};

// src/employeeCheck/hoursWorked.ts
var parseHoursWorked = ({
  allLines,
  columnStart,
  columnEnd
}) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));
  const dayColumns = [1, 8, 15, 22, 29, 36, 43];
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  const parseDayHours = (line, dayColumn) => parseNumber(line.slice(dayColumn, dayColumn + 7).trim());
  const getHoursForLine = (lineIndex) => {
    const line = lines[lineIndex];
    let hours = {};
    for (let i = 0; i < days.length; i++) {
      hours[days[i]] = parseDayHours(line, dayColumns[i]);
    }
    const payRate = parseNumber(line.slice(58)) || void 0;
    return {
      hours,
      payRate
    };
  };
  const hoursWorked = {
    thisProject: {
      straightTime: getHoursForLine(3),
      timeAndAHalf: getHoursForLine(4),
      doubleTime: getHoursForLine(5)
    }
  };
  const otherProjectsLine = lines[6];
  if (!(otherProjectsLine == null ? void 0 : otherProjectsLine.startsWith("Other Projects:"))) {
    return hoursWorked;
  }
  return __spreadProps(__spreadValues({}, hoursWorked), {
    otherProjects: {
      straightTime: getHoursForLine(7),
      timeAndAHalf: getHoursForLine(8),
      doubleTime: getHoursForLine(9)
    }
  });
};

// src/employeeCheck/net.ts
var parseNet = ({ allLines, columnStart, columnEnd }) => {
  var _a;
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));
  return (_a = parseNumber(lines[4])) != null ? _a : 0;
};

// src/employeeCheck/payClassAndRate.ts
var parsePayClassAndRate = (allLines) => {
  const payClassAndRateLine = allLines[0];
  const payClass = payClassAndRateLine.slice(15, payClassAndRateLine.indexOf("PAY RATE") - 2).trim();
  const payRate = payClassAndRateLine.slice(payClassAndRateLine.indexOf("PAY RATE") + 10).replace(" **", "").trim();
  return {
    payClass,
    payRate
  };
};

// src/employeeCheck/sdiSuiOther.ts
var parseSdiSuiOther = ({
  allLines,
  columnStart,
  columnEnd
}) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));
  return parseNumber(lines[3]) || parseNumber(lines[4]) || parseNumber(lines[5]) || parseNumber(lines[6]);
};

// src/employeeCheck/stateLocalTaxes.ts
var parseStateLocalTaxes = ({
  allLines,
  columnStart,
  columnEnd
}) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));
  return {
    state: parseNumber(lines[3]),
    local: parseNumber(lines[4])
  };
};

// src/employeeCheck/totalDeductions.ts
var parseTotalDeductions = ({
  allLines,
  columnStart,
  columnEnd
}) => {
  var _a;
  const lines = allLines.map((line2) => line2.slice(columnStart, columnEnd));
  const line = lines[4];
  const value = (_a = parseNumber(line)) != null ? _a : 0;
  const totalDeductions = line.includes("-") ? -1 * value : value;
  return totalDeductions;
};

// src/employeeCheck/totalWages.ts
var parseTotalWages = ({
  allLines,
  columnStart,
  columnEnd
}) => {
  var _a, _b;
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));
  return {
    projectWage: (_a = parseNumber(lines[3])) != null ? _a : 0,
    totalGross: (_b = parseNumber(lines[4])) != null ? _b : 0
  };
};

// src/employeeCheck/index.ts
var isEmployeeCheckStart = (line) => line.startsWith(" ** PAY CLASS");
var parseEmployeeCheck = (lines) => {
  console.log(lines);
  const { payClass, payRate } = parsePayClassAndRate(lines);
  const employee = parseEmployee({
    allLines: lines,
    columnStart: 0,
    columnEnd: 30
  });
  const hoursWorked = parseHoursWorked({
    allLines: lines,
    columnStart: 30,
    columnEnd: 95
  });
  const { projectWage, totalGross } = parseTotalWages({
    allLines: lines,
    columnStart: 95,
    columnEnd: 106
  });
  const federalTaxes = parseFederalTaxes({
    allLines: lines,
    columnStart: 106,
    columnEnd: 115
  });
  const { state, local } = parseStateLocalTaxes({
    allLines: lines,
    columnStart: 115,
    columnEnd: 127
  });
  const sdiSuiOther = parseSdiSuiOther({
    allLines: lines,
    columnStart: 127,
    columnEnd: 139
  });
  const totalDeductions = parseTotalDeductions({
    allLines: lines,
    columnStart: 139,
    columnEnd: 148
  });
  const net = parseNet({
    allLines: lines,
    columnStart: 148,
    columnEnd: 159
  });
  const { deductions, reimbursements } = parseDeductionsAndReimbursements({
    allLines: lines,
    columnStart: 95,
    columnEnd: 159
  });
  const fringeDetail = parseFringeDetail({
    allLines: lines,
    columnStart: 159,
    columnEnd: 200
  });
  return {
    payClass,
    payRate,
    employee,
    hoursWorked,
    projectWage,
    totalGross,
    taxes: {
      federal: federalTaxes,
      state,
      local
    },
    sdiSuiOther,
    totalDeductions,
    net,
    fringeDetail,
    deductions,
    reimbursements
  };
};

// src/project/index.ts
var isProjectStartLine = (line) => line.startsWith("*** PROJECT ID");
var parseProjectId = (line) => line.slice(14, line.lastIndexOf("***") - 1).trim();
function parseProjects(lines) {
  const projects = [];
  let currentProject = null;
  let employeeCheckLines = null;
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (isProjectStartLine(line)) {
      const projectId = parseProjectId(line);
      if (!currentProject || currentProject.projectId !== projectId) {
        currentProject = { projectId, employeeChecks: [] };
        projects.push(currentProject);
      }
    } else if (currentProject && isEmployeeCheckStart(line)) {
      if (employeeCheckLines) {
        const employeeNameLine = lines[i + 2];
        if (employeeNameLine.startsWith(" ")) {
          employeeCheckLines = employeeCheckLines.slice(
            0,
            employeeCheckLines.length - 12
          );
          i += 2;
          continue;
        } else {
          const parsedCheck = parseEmployeeCheck(employeeCheckLines);
          currentProject.employeeChecks.push(parsedCheck);
        }
      }
      employeeCheckLines = [line];
    } else if (employeeCheckLines) {
      employeeCheckLines.push(line);
    }
    i++;
  }
  return projects;
}

// src/reportDate.ts
var parseReportDate = (reportLines) => {
  const line = reportLines.find(
    (line2) => line2.startsWith("Certified Payroll-")
  );
  if (!line) {
    throw new Error("Could not find line with date");
  }
  const [, , dateString] = line.trim().split(/\s{2,}/);
  const [month, day, year] = dateString.split(" ");
  const monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ].indexOf(month);
  const date = new Date(Date.UTC(parseInt(year), monthIndex, parseInt(day)));
  if (isNaN(date.getTime())) {
    throw new Error(`Could not parse date: ${dateString}`);
  }
  return date;
};

// src/parseReport.ts
var parseReport = (fileContents) => {
  const reportLines = fileContents.split("\n");
  return {
    reportDate: parseReportDate(reportLines),
    projects: parseProjects(reportLines)
  };
};

// src/csv/writeCsv.ts
var import_csv_writer = __toESM(require_dist());
var import_path = __toESM(require("path"));
async function writeCsv({
  parsedReport,
  format,
  filePath
}) {
  const outDir = import_path.default.dirname(filePath);
  const rows = format.toRows(parsedReport);
  const csvWriter = (0, import_csv_writer.createObjectCsvWriter)({
    path: import_path.default.join(
      outDir,
      `${parsedReport.reportDate.toLocaleDateString().replace(/\//g, "-")}_${format.label}.csv`
    ),
    header: format.header
  });
  await csvWriter.writeRecords(rows);
}

// src/renderer.ts
var fileSelectBtn = document.getElementById("file-select-btn");
fileSelectBtn == null ? void 0 : fileSelectBtn.addEventListener("click", () => {
  import_electron.ipcRenderer.send("open-file-dialog");
});
import_electron.ipcRenderer.on("file-selected", (_, filePath) => {
  import_fs.default.readFile(filePath, "utf-8", async (err, data) => {
    if (err) {
      console.error("An error occurred reading the file: " + err.message);
      throw err;
    }
    const parsedReport = parseReport(data);
    import_fs.default.writeFileSync("output.json", JSON.stringify(parsedReport));
    await writeCsv({
      parsedReport,
      // TODO: provide a way to choose format
      format: getEmarsFormat(parsedReport),
      filePath
    });
  });
});
