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
// This module ports:
// - https://github.com/nodejs/node/blob/master/src/async_wrap-inl.h
// - https://github.com/nodejs/node/blob/master/src/async_wrap.cc
// - https://github.com/nodejs/node/blob/master/src/async_wrap.h
export function registerDestroyHook(// deno-lint-ignore no-explicit-any
_target, _asyncId, _prop) {
// TODO(kt3k): implement actual procedures
}
export var constants;
(function(constants) {
    constants[constants["kInit"] = 0] = "kInit";
    constants[constants["kBefore"] = 1] = "kBefore";
    constants[constants["kAfter"] = 2] = "kAfter";
    constants[constants["kDestroy"] = 3] = "kDestroy";
    constants[constants["kPromiseResolve"] = 4] = "kPromiseResolve";
    constants[constants["kTotals"] = 5] = "kTotals";
    constants[constants["kCheck"] = 6] = "kCheck";
    constants[constants["kExecutionAsyncId"] = 7] = "kExecutionAsyncId";
    constants[constants["kTriggerAsyncId"] = 8] = "kTriggerAsyncId";
    constants[constants["kAsyncIdCounter"] = 9] = "kAsyncIdCounter";
    constants[constants["kDefaultTriggerAsyncId"] = 10] = "kDefaultTriggerAsyncId";
    constants[constants["kUsesExecutionAsyncResource"] = 11] = "kUsesExecutionAsyncResource";
    constants[constants["kStackLength"] = 12] = "kStackLength";
})(constants || (constants = {}));
const asyncHookFields = new Uint32Array(Object.keys(constants).length);
export { asyncHookFields as async_hook_fields };
// Increment the internal id counter and return the value.
export function newAsyncId() {
    return ++asyncIdFields[constants.kAsyncIdCounter];
}
export var UidFields;
(function(UidFields) {
    UidFields[UidFields["kExecutionAsyncId"] = 0] = "kExecutionAsyncId";
    UidFields[UidFields["kTriggerAsyncId"] = 1] = "kTriggerAsyncId";
    UidFields[UidFields["kAsyncIdCounter"] = 2] = "kAsyncIdCounter";
    UidFields[UidFields["kDefaultTriggerAsyncId"] = 3] = "kDefaultTriggerAsyncId";
    UidFields[UidFields["kUidFieldsCount"] = 4] = "kUidFieldsCount";
})(UidFields || (UidFields = {}));
const asyncIdFields = new Float64Array(Object.keys(UidFields).length);
// `kAsyncIdCounter` should start at `1` because that'll be the id the execution
// context during bootstrap.
asyncIdFields[UidFields.kAsyncIdCounter] = 1;
// `kDefaultTriggerAsyncId` should be `-1`, this indicates that there is no
// specified default value and it should fallback to the executionAsyncId.
// 0 is not used as the magic value, because that indicates a missing
// context which is different from a default context.
asyncIdFields[UidFields.kDefaultTriggerAsyncId] = -1;
export { asyncIdFields };
export var providerType;
(function(providerType) {
    providerType[providerType["NONE"] = 0] = "NONE";
    providerType[providerType["DIRHANDLE"] = 1] = "DIRHANDLE";
    providerType[providerType["DNSCHANNEL"] = 2] = "DNSCHANNEL";
    providerType[providerType["ELDHISTOGRAM"] = 3] = "ELDHISTOGRAM";
    providerType[providerType["FILEHANDLE"] = 4] = "FILEHANDLE";
    providerType[providerType["FILEHANDLECLOSEREQ"] = 5] = "FILEHANDLECLOSEREQ";
    providerType[providerType["FIXEDSIZEBLOBCOPY"] = 6] = "FIXEDSIZEBLOBCOPY";
    providerType[providerType["FSEVENTWRAP"] = 7] = "FSEVENTWRAP";
    providerType[providerType["FSREQCALLBACK"] = 8] = "FSREQCALLBACK";
    providerType[providerType["FSREQPROMISE"] = 9] = "FSREQPROMISE";
    providerType[providerType["GETADDRINFOREQWRAP"] = 10] = "GETADDRINFOREQWRAP";
    providerType[providerType["GETNAMEINFOREQWRAP"] = 11] = "GETNAMEINFOREQWRAP";
    providerType[providerType["HEAPSNAPSHOT"] = 12] = "HEAPSNAPSHOT";
    providerType[providerType["HTTP2SESSION"] = 13] = "HTTP2SESSION";
    providerType[providerType["HTTP2STREAM"] = 14] = "HTTP2STREAM";
    providerType[providerType["HTTP2PING"] = 15] = "HTTP2PING";
    providerType[providerType["HTTP2SETTINGS"] = 16] = "HTTP2SETTINGS";
    providerType[providerType["HTTPINCOMINGMESSAGE"] = 17] = "HTTPINCOMINGMESSAGE";
    providerType[providerType["HTTPCLIENTREQUEST"] = 18] = "HTTPCLIENTREQUEST";
    providerType[providerType["JSSTREAM"] = 19] = "JSSTREAM";
    providerType[providerType["JSUDPWRAP"] = 20] = "JSUDPWRAP";
    providerType[providerType["MESSAGEPORT"] = 21] = "MESSAGEPORT";
    providerType[providerType["PIPECONNECTWRAP"] = 22] = "PIPECONNECTWRAP";
    providerType[providerType["PIPESERVERWRAP"] = 23] = "PIPESERVERWRAP";
    providerType[providerType["PIPEWRAP"] = 24] = "PIPEWRAP";
    providerType[providerType["PROCESSWRAP"] = 25] = "PROCESSWRAP";
    providerType[providerType["PROMISE"] = 26] = "PROMISE";
    providerType[providerType["QUERYWRAP"] = 27] = "QUERYWRAP";
    providerType[providerType["SHUTDOWNWRAP"] = 28] = "SHUTDOWNWRAP";
    providerType[providerType["SIGNALWRAP"] = 29] = "SIGNALWRAP";
    providerType[providerType["STATWATCHER"] = 30] = "STATWATCHER";
    providerType[providerType["STREAMPIPE"] = 31] = "STREAMPIPE";
    providerType[providerType["TCPCONNECTWRAP"] = 32] = "TCPCONNECTWRAP";
    providerType[providerType["TCPSERVERWRAP"] = 33] = "TCPSERVERWRAP";
    providerType[providerType["TCPWRAP"] = 34] = "TCPWRAP";
    providerType[providerType["TTYWRAP"] = 35] = "TTYWRAP";
    providerType[providerType["UDPSENDWRAP"] = 36] = "UDPSENDWRAP";
    providerType[providerType["UDPWRAP"] = 37] = "UDPWRAP";
    providerType[providerType["SIGINTWATCHDOG"] = 38] = "SIGINTWATCHDOG";
    providerType[providerType["WORKER"] = 39] = "WORKER";
    providerType[providerType["WORKERHEAPSNAPSHOT"] = 40] = "WORKERHEAPSNAPSHOT";
    providerType[providerType["WRITEWRAP"] = 41] = "WRITEWRAP";
    providerType[providerType["ZLIB"] = 42] = "ZLIB";
})(providerType || (providerType = {}));
const kInvalidAsyncId = -1;
export class AsyncWrap {
    provider = providerType.NONE;
    asyncId = kInvalidAsyncId;
    constructor(provider){
        this.provider = provider;
        this.getAsyncId();
    }
    getAsyncId() {
        this.asyncId = this.asyncId === kInvalidAsyncId ? newAsyncId() : this.asyncId;
        return this.asyncId;
    }
    getProviderType() {
        return this.provider;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE0Ny4wL25vZGUvaW50ZXJuYWxfYmluZGluZy9hc3luY193cmFwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gVGhpcyBtb2R1bGUgcG9ydHM6XG4vLyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL21hc3Rlci9zcmMvYXN5bmNfd3JhcC1pbmwuaFxuLy8gLSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi9tYXN0ZXIvc3JjL2FzeW5jX3dyYXAuY2Ncbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvbWFzdGVyL3NyYy9hc3luY193cmFwLmhcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVzdHJveUhvb2soXG4gIC8vIGRlbm8tbGludC1pZ25vcmUgbm8tZXhwbGljaXQtYW55XG4gIF90YXJnZXQ6IGFueSxcbiAgX2FzeW5jSWQ6IG51bWJlcixcbiAgX3Byb3A6IHsgZGVzdHJveWVkOiBib29sZWFuIH0sXG4pIHtcbiAgLy8gVE9ETyhrdDNrKTogaW1wbGVtZW50IGFjdHVhbCBwcm9jZWR1cmVzXG59XG5cbmV4cG9ydCBlbnVtIGNvbnN0YW50cyB7XG4gIGtJbml0LFxuICBrQmVmb3JlLFxuICBrQWZ0ZXIsXG4gIGtEZXN0cm95LFxuICBrUHJvbWlzZVJlc29sdmUsXG4gIGtUb3RhbHMsXG4gIGtDaGVjayxcbiAga0V4ZWN1dGlvbkFzeW5jSWQsXG4gIGtUcmlnZ2VyQXN5bmNJZCxcbiAga0FzeW5jSWRDb3VudGVyLFxuICBrRGVmYXVsdFRyaWdnZXJBc3luY0lkLFxuICBrVXNlc0V4ZWN1dGlvbkFzeW5jUmVzb3VyY2UsXG4gIGtTdGFja0xlbmd0aCxcbn1cblxuY29uc3QgYXN5bmNIb29rRmllbGRzID0gbmV3IFVpbnQzMkFycmF5KE9iamVjdC5rZXlzKGNvbnN0YW50cykubGVuZ3RoKTtcblxuZXhwb3J0IHsgYXN5bmNIb29rRmllbGRzIGFzIGFzeW5jX2hvb2tfZmllbGRzIH07XG5cbi8vIEluY3JlbWVudCB0aGUgaW50ZXJuYWwgaWQgY291bnRlciBhbmQgcmV0dXJuIHRoZSB2YWx1ZS5cbmV4cG9ydCBmdW5jdGlvbiBuZXdBc3luY0lkKCkge1xuICByZXR1cm4gKythc3luY0lkRmllbGRzW2NvbnN0YW50cy5rQXN5bmNJZENvdW50ZXJdO1xufVxuXG5leHBvcnQgZW51bSBVaWRGaWVsZHMge1xuICBrRXhlY3V0aW9uQXN5bmNJZCxcbiAga1RyaWdnZXJBc3luY0lkLFxuICBrQXN5bmNJZENvdW50ZXIsXG4gIGtEZWZhdWx0VHJpZ2dlckFzeW5jSWQsXG4gIGtVaWRGaWVsZHNDb3VudCxcbn1cblxuY29uc3QgYXN5bmNJZEZpZWxkcyA9IG5ldyBGbG9hdDY0QXJyYXkoT2JqZWN0LmtleXMoVWlkRmllbGRzKS5sZW5ndGgpO1xuXG4vLyBga0FzeW5jSWRDb3VudGVyYCBzaG91bGQgc3RhcnQgYXQgYDFgIGJlY2F1c2UgdGhhdCdsbCBiZSB0aGUgaWQgdGhlIGV4ZWN1dGlvblxuLy8gY29udGV4dCBkdXJpbmcgYm9vdHN0cmFwLlxuYXN5bmNJZEZpZWxkc1tVaWRGaWVsZHMua0FzeW5jSWRDb3VudGVyXSA9IDE7XG5cbi8vIGBrRGVmYXVsdFRyaWdnZXJBc3luY0lkYCBzaG91bGQgYmUgYC0xYCwgdGhpcyBpbmRpY2F0ZXMgdGhhdCB0aGVyZSBpcyBub1xuLy8gc3BlY2lmaWVkIGRlZmF1bHQgdmFsdWUgYW5kIGl0IHNob3VsZCBmYWxsYmFjayB0byB0aGUgZXhlY3V0aW9uQXN5bmNJZC5cbi8vIDAgaXMgbm90IHVzZWQgYXMgdGhlIG1hZ2ljIHZhbHVlLCBiZWNhdXNlIHRoYXQgaW5kaWNhdGVzIGEgbWlzc2luZ1xuLy8gY29udGV4dCB3aGljaCBpcyBkaWZmZXJlbnQgZnJvbSBhIGRlZmF1bHQgY29udGV4dC5cbmFzeW5jSWRGaWVsZHNbVWlkRmllbGRzLmtEZWZhdWx0VHJpZ2dlckFzeW5jSWRdID0gLTE7XG5cbmV4cG9ydCB7IGFzeW5jSWRGaWVsZHMgfTtcblxuZXhwb3J0IGVudW0gcHJvdmlkZXJUeXBlIHtcbiAgTk9ORSxcbiAgRElSSEFORExFLFxuICBETlNDSEFOTkVMLFxuICBFTERISVNUT0dSQU0sXG4gIEZJTEVIQU5ETEUsXG4gIEZJTEVIQU5ETEVDTE9TRVJFUSxcbiAgRklYRURTSVpFQkxPQkNPUFksXG4gIEZTRVZFTlRXUkFQLFxuICBGU1JFUUNBTExCQUNLLFxuICBGU1JFUVBST01JU0UsXG4gIEdFVEFERFJJTkZPUkVRV1JBUCxcbiAgR0VUTkFNRUlORk9SRVFXUkFQLFxuICBIRUFQU05BUFNIT1QsXG4gIEhUVFAyU0VTU0lPTixcbiAgSFRUUDJTVFJFQU0sXG4gIEhUVFAyUElORyxcbiAgSFRUUDJTRVRUSU5HUyxcbiAgSFRUUElOQ09NSU5HTUVTU0FHRSxcbiAgSFRUUENMSUVOVFJFUVVFU1QsXG4gIEpTU1RSRUFNLFxuICBKU1VEUFdSQVAsXG4gIE1FU1NBR0VQT1JULFxuICBQSVBFQ09OTkVDVFdSQVAsXG4gIFBJUEVTRVJWRVJXUkFQLFxuICBQSVBFV1JBUCxcbiAgUFJPQ0VTU1dSQVAsXG4gIFBST01JU0UsXG4gIFFVRVJZV1JBUCxcbiAgU0hVVERPV05XUkFQLFxuICBTSUdOQUxXUkFQLFxuICBTVEFUV0FUQ0hFUixcbiAgU1RSRUFNUElQRSxcbiAgVENQQ09OTkVDVFdSQVAsXG4gIFRDUFNFUlZFUldSQVAsXG4gIFRDUFdSQVAsXG4gIFRUWVdSQVAsXG4gIFVEUFNFTkRXUkFQLFxuICBVRFBXUkFQLFxuICBTSUdJTlRXQVRDSERPRyxcbiAgV09SS0VSLFxuICBXT1JLRVJIRUFQU05BUFNIT1QsXG4gIFdSSVRFV1JBUCxcbiAgWkxJQixcbn1cblxuY29uc3Qga0ludmFsaWRBc3luY0lkID0gLTE7XG5cbmV4cG9ydCBjbGFzcyBBc3luY1dyYXAge1xuICBwcm92aWRlcjogcHJvdmlkZXJUeXBlID0gcHJvdmlkZXJUeXBlLk5PTkU7XG4gIGFzeW5jSWQgPSBrSW52YWxpZEFzeW5jSWQ7XG5cbiAgY29uc3RydWN0b3IocHJvdmlkZXI6IHByb3ZpZGVyVHlwZSkge1xuICAgIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICB0aGlzLmdldEFzeW5jSWQoKTtcbiAgfVxuXG4gIGdldEFzeW5jSWQoKTogbnVtYmVyIHtcbiAgICB0aGlzLmFzeW5jSWQgPSB0aGlzLmFzeW5jSWQgPT09IGtJbnZhbGlkQXN5bmNJZFxuICAgICAgPyBuZXdBc3luY0lkKClcbiAgICAgIDogdGhpcy5hc3luY0lkO1xuXG4gICAgcmV0dXJuIHRoaXMuYXN5bmNJZDtcbiAgfVxuXG4gIGdldFByb3ZpZGVyVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm92aWRlcjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxzREFBc0Q7QUFDdEQsRUFBRTtBQUNGLDBFQUEwRTtBQUMxRSxnRUFBZ0U7QUFDaEUsc0VBQXNFO0FBQ3RFLHNFQUFzRTtBQUN0RSw0RUFBNEU7QUFDNUUscUVBQXFFO0FBQ3JFLHdCQUF3QjtBQUN4QixFQUFFO0FBQ0YsMEVBQTBFO0FBQzFFLHlEQUF5RDtBQUN6RCxFQUFFO0FBQ0YsMEVBQTBFO0FBQzFFLDZEQUE2RDtBQUM3RCw0RUFBNEU7QUFDNUUsMkVBQTJFO0FB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