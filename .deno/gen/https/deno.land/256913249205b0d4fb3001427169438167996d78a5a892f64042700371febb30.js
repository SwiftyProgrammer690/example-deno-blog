// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
import { Buffer } from "../buffer.ts";
import { uvException } from "./errors.ts";
import { writeBuffer } from "../internal_binding/node_file.ts";
// IPv4 Segment
const v4Seg = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
const v4Str = `(${v4Seg}[.]){3}${v4Seg}`;
const IPv4Reg = new RegExp(`^${v4Str}$`);
// IPv6 Segment
const v6Seg = "(?:[0-9a-fA-F]{1,4})";
const IPv6Reg = new RegExp("^(" + `(?:${v6Seg}:){7}(?:${v6Seg}|:)|` + `(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|` + `(?:${v6Seg}:){5}(?::${v4Str}|(:${v6Seg}){1,2}|:)|` + `(?:${v6Seg}:){4}(?:(:${v6Seg}){0,1}:${v4Str}|(:${v6Seg}){1,3}|:)|` + `(?:${v6Seg}:){3}(?:(:${v6Seg}){0,2}:${v4Str}|(:${v6Seg}){1,4}|:)|` + `(?:${v6Seg}:){2}(?:(:${v6Seg}){0,3}:${v4Str}|(:${v6Seg}){1,5}|:)|` + `(?:${v6Seg}:){1}(?:(:${v6Seg}){0,4}:${v4Str}|(:${v6Seg}){1,6}|:)|` + `(?::((?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:))` + ")(%[0-9a-zA-Z-.:]{1,})?$");
export function isIPv4(ip) {
    return RegExp.prototype.test.call(IPv4Reg, ip);
}
export function isIPv6(ip) {
    return RegExp.prototype.test.call(IPv6Reg, ip);
}
export function isIP(ip) {
    if (isIPv4(ip)) {
        return 4;
    }
    if (isIPv6(ip)) {
        return 6;
    }
    return 0;
}
export function makeSyncWrite(fd) {
    return function(// deno-lint-ignore no-explicit-any
    chunk, enc, cb) {
        if (enc !== "buffer") {
            chunk = Buffer.from(chunk, enc);
        }
        this._handle.bytesWritten += chunk.length;
        const ctx = {};
        writeBuffer(fd, chunk, 0, chunk.length, null, ctx);
        if (ctx.errno !== undefined) {
            const ex = uvException(ctx);
            ex.errno = ctx.errno;
            return cb(ex);
        }
        cb();
    };
}
export const normalizedArgsSymbol = Symbol("normalizedArgs");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE0Ny4wL25vZGUvaW50ZXJuYWwvbmV0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcIi4uL2J1ZmZlci50c1wiO1xuaW1wb3J0IHsgdXZFeGNlcHRpb24gfSBmcm9tIFwiLi9lcnJvcnMudHNcIjtcbmltcG9ydCB7IHdyaXRlQnVmZmVyIH0gZnJvbSBcIi4uL2ludGVybmFsX2JpbmRpbmcvbm9kZV9maWxlLnRzXCI7XG5cbi8vIElQdjQgU2VnbWVudFxuY29uc3QgdjRTZWcgPSBcIig/OlswLTldfFsxLTldWzAtOV18MVswLTldWzAtOV18MlswLTRdWzAtOV18MjVbMC01XSlcIjtcbmNvbnN0IHY0U3RyID0gYCgke3Y0U2VnfVsuXSl7M30ke3Y0U2VnfWA7XG5jb25zdCBJUHY0UmVnID0gbmV3IFJlZ0V4cChgXiR7djRTdHJ9JGApO1xuXG4vLyBJUHY2IFNlZ21lbnRcbmNvbnN0IHY2U2VnID0gXCIoPzpbMC05YS1mQS1GXXsxLDR9KVwiO1xuY29uc3QgSVB2NlJlZyA9IG5ldyBSZWdFeHAoXG4gIFwiXihcIiArXG4gICAgYCg/OiR7djZTZWd9Oil7N30oPzoke3Y2U2VnfXw6KXxgICtcbiAgICBgKD86JHt2NlNlZ306KXs2fSg/OiR7djRTdHJ9fDoke3Y2U2VnfXw6KXxgICtcbiAgICBgKD86JHt2NlNlZ306KXs1fSg/Ojoke3Y0U3RyfXwoOiR7djZTZWd9KXsxLDJ9fDopfGAgK1xuICAgIGAoPzoke3Y2U2VnfTopezR9KD86KDoke3Y2U2VnfSl7MCwxfToke3Y0U3RyfXwoOiR7djZTZWd9KXsxLDN9fDopfGAgK1xuICAgIGAoPzoke3Y2U2VnfTopezN9KD86KDoke3Y2U2VnfSl7MCwyfToke3Y0U3RyfXwoOiR7djZTZWd9KXsxLDR9fDopfGAgK1xuICAgIGAoPzoke3Y2U2VnfTopezJ9KD86KDoke3Y2U2VnfSl7MCwzfToke3Y0U3RyfXwoOiR7djZTZWd9KXsxLDV9fDopfGAgK1xuICAgIGAoPzoke3Y2U2VnfTopezF9KD86KDoke3Y2U2VnfSl7MCw0fToke3Y0U3RyfXwoOiR7djZTZWd9KXsxLDZ9fDopfGAgK1xuICAgIGAoPzo6KCg/Ojoke3Y2U2VnfSl7MCw1fToke3Y0U3RyfXwoPzo6JHt2NlNlZ30pezEsN318OikpYCArXG4gICAgXCIpKCVbMC05YS16QS1aLS46XXsxLH0pPyRcIixcbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0lQdjQoaXA6IHN0cmluZykge1xuICByZXR1cm4gUmVnRXhwLnByb3RvdHlwZS50ZXN0LmNhbGwoSVB2NFJlZywgaXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJUHY2KGlwOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFJlZ0V4cC5wcm90b3R5cGUudGVzdC5jYWxsKElQdjZSZWcsIGlwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSVAoaXA6IHN0cmluZykge1xuICBpZiAoaXNJUHY0KGlwKSkge1xuICAgIHJldHVybiA0O1xuICB9XG4gIGlmIChpc0lQdjYoaXApKSB7XG4gICAgcmV0dXJuIDY7XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VTeW5jV3JpdGUoZmQ6IG51bWJlcikge1xuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIC8vIGRlbm8tbGludC1pZ25vcmUgbm8tZXhwbGljaXQtYW55XG4gICAgdGhpczogYW55LFxuICAgIC8vIGRlbm8tbGludC1pZ25vcmUgbm8tZXhwbGljaXQtYW55XG4gICAgY2h1bms6IGFueSxcbiAgICBlbmM6IHN0cmluZyxcbiAgICBjYjogKGVycj86IEVycm9yKSA9PiB2b2lkLFxuICApIHtcbiAgICBpZiAoZW5jICE9PSBcImJ1ZmZlclwiKSB7XG4gICAgICBjaHVuayA9IEJ1ZmZlci5mcm9tKGNodW5rLCBlbmMpO1xuICAgIH1cblxuICAgIHRoaXMuX2hhbmRsZS5ieXRlc1dyaXR0ZW4gKz0gY2h1bmsubGVuZ3RoO1xuXG4gICAgY29uc3QgY3R4OiB7IGVycm5vPzogbnVtYmVyIH0gPSB7fTtcbiAgICB3cml0ZUJ1ZmZlcihmZCwgY2h1bmssIDAsIGNodW5rLmxlbmd0aCwgbnVsbCwgY3R4KTtcblxuICAgIGlmIChjdHguZXJybm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgZXggPSB1dkV4Y2VwdGlvbihjdHgpO1xuICAgICAgZXguZXJybm8gPSBjdHguZXJybm87XG5cbiAgICAgIHJldHVybiBjYihleCk7XG4gICAgfVxuXG4gICAgY2IoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZWRBcmdzU3ltYm9sID0gU3ltYm9sKFwibm9ybWFsaXplZEFyZ3NcIik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLHNEQUFzRDtBQUN0RCxFQUFFO0FBQ0YsMEVBQTBFO0FBQzFFLGdFQUFnRTtBQUNoRSxzRUFBc0U7QUFDdEUsc0VBQXNFO0FBQ3RFLDRFQUE0RTtBQUM1RSxxRUFBcUU7QUFDckUsd0JBQXdCO0FBQ3hCLEVBQUU7QUFDRiwwRUFBMEU7QUFDMUUseURBQXlEO0FBQ3pELEVBQUU7QUFDRiwwRUFBMEU7QUFDMUUsNkRBQTZEO0FBQzdELDRFQUE0RTtBQUM1RSwyRUFBMkU7QUFDM0Usd0VBQXdF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