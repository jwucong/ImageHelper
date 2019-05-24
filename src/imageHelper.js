import {
  type,
  typeOf,
  base64ToBlob,
  blobToBase64,
  fileToBlob
} from './utils'

export default class ImageHelper {
  constructor(options) {
    Object.defineProperties(this, {
      name: {
        value: 'ImageHelper',
        enumerable: true,
        configurable: false
      },
      version: {
        value: '1.0.0',
        enumerable: true,
        configurable: false
      }
    })
  }

  read(inputs, output, callback) {
    if (typeof output === 'function') {
      callback = output
      output = undefined
    }
    const base64 = 'base64'
    const blob = 'blob'
    const accept = ['object', 'string', 'file', 'blob']
    const getOutput = val => val === base64 ? base64 : blob
    const filter = value => typeOf(value, accept)
    const list = [].concat.apply([], inputs).filter(filter).map(item => {
      if (type(item) === 'object') {
        return typeOf(item.input, accept.slice(1)) ? item : null
      }
      return {
        input: item,
        output: getOutput(output),
        callback: null
      }
    }).filter(item => !!item)
    const result = []
    const exec = (index, data, cb) => {
      result[index] = data
      cb && cb(data)
      if(index >= list.length - 1) {
        callback && callback(result)
      }
    }
    for (let i = 0; i < list.length; i++) {
      const {input, output, callback} = list[i]
      const itype = type(input)
      const otype = getOutput(output)
      if (itype === 'string') {
        exec(i, otype === base64 ? input : base64ToBlob(input), callback)
      } else {
        const fn = otype === base64 ? blobToBase64 : fileToBlob
        fn(input, data => exec(i, data, callback))
      }
    }
  }

  compress() {
    console.log('compress')
  }


}
