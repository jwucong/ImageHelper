// base64: data:image/jpeg;base64,xxxxx
// reg:

export const type = value => {
  return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()
}

export const typeOf = (value, types) => {
  return types.indexOf(type(value).toLocaleLowerCase()) !== -1
}

export const base64ToArrayBuffer = base64 => {
  const reg = /data:([^;]);base64,(.+)/
  const match = reg.exec(base64)
  if (!match) {
    throw new Error('Not a valid Base64 string')
  }
  var data = match[2];
  var binary = atob(data);
  var size = binary.length;
  var buffer = new ArrayBuffer(size);
  var view = new Uint8Array(buffer);
  for (var i = 0; i < size; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}

export const base64ToBlob = base64 => {
  const buffer = base64ToArrayBuffer(base64)
  const reg = /data:([^;]);base64,(.+)/
  const match = reg.exec(base64)
  const type = match[1]
  return new Blob([buffer], {type})
}

export const blobToBase64 = (blob, callback) => {
  const reader = new FileReader()
  reader.onload = function () {
    callback && callback(this.result)
  }
  reader.readAsDataURL(blob)
}


export const fileToBlob = (file, callback) => {
  const exec = val => callback && callback(val)
  if(type(file) === 'bolb') {
    exec(file)
    return
  }
  const reader = new FileReader()
  reader.onload = function () {
    exec(new Blob([this.result], {type: file.type}))
  }
  reader.readAsArrayBuffer(file)
}
