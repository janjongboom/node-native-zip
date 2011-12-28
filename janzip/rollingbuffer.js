function RollingBuffer (arg0, arg1, arg2) {
    var offset = 0x00;
    
    this.buf = new Buffer(arg0, arg1, arg2); // make this nice :)
    this.length = this.buf.length;
    
    this.write = function (str, encoding) {        
        var written = this.buf.write(str, offset, encoding);
        offset += written;
    };
    
    this.appendBuffer = function (newBuffer) {
        if (newBuffer instanceof Buffer) {
            newBuffer.copy(this.buf, offset);
            offset += newBuffer.length;
        }
        else if (newBuffer instanceof RollingBuffer) {
            newBuffer.buf.copy(this.buf, offset);
            offset += newBuffer.buf.length;
        }
    };
    
    this.toString = function (encoding) {
        return this.buf.toString(encoding);
    };
    
    this.writeInt8 = function (data) {
        this.buf[offset] = data;
        offset += 1;
    };
    
    this.writeInt16 = function (data) {
        this.buf[offset] = data & 0xff;
        this.buf[offset + 1] = (data & 0xff00) >> 8;
        
        offset += 2;
    };
    
    this.writeInt32 = function (data) {
        this.buf[offset] = data & 0xff;
        this.buf[offset + 1] = (data & 0xff00) >> 0x08;
        this.buf[offset + 2] = (data & 0xff0000) >> 0x10;
        this.buf[offset + 3] = (data & 0xff000000) >> 0x18;
        
        offset += 4;        
    };
    
    this.getInternalBuffer = function () {
        return this.buf;
    };
}

module.exports = RollingBuffer;