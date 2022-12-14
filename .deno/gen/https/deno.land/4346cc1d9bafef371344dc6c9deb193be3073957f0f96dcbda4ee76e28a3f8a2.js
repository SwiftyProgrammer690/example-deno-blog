// Copyright 2018-2021 the oak authors. All rights reserved. MIT license.
// This was inspired by https://github.com/suryagh/tsscmp which provides a
// timing safe string comparison to avoid timing attacks as described in
// https://codahale.com/a-lesson-in-timing-attacks/.
import { assert, importKey, sign } from "./util.ts";
function compareArrayBuffer(a, b) {
    assert(a.byteLength === b.byteLength, "ArrayBuffer lengths must match.");
    const va = new DataView(a);
    const vb = new DataView(b);
    const length = va.byteLength;
    let out = 0;
    let i = -1;
    while(++i < length){
        out |= va.getUint8(i) ^ vb.getUint8(i);
    }
    return out === 0;
}
/** Compare two strings, Uint8Arrays, ArrayBuffers, or arrays of numbers in a
 * way that avoids timing based attacks on the comparisons on the values.
 *
 * The function will return `true` if the values match, or `false`, if they
 * do not match. */ export async function compare(a, b) {
    const key = new Uint8Array(32);
    globalThis.crypto.getRandomValues(key);
    const cryptoKey = await importKey(key);
    const ah = await sign(a, cryptoKey);
    const bh = await sign(b, cryptoKey);
    return compareArrayBuffer(ah, bh);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvb2FrQHYxMC4xLjAvdHNzQ29tcGFyZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIHRoZSBvYWsgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG5cbi8vIFRoaXMgd2FzIGluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9zdXJ5YWdoL3Rzc2NtcCB3aGljaCBwcm92aWRlcyBhXG4vLyB0aW1pbmcgc2FmZSBzdHJpbmcgY29tcGFyaXNvbiB0byBhdm9pZCB0aW1pbmcgYXR0YWNrcyBhcyBkZXNjcmliZWQgaW5cbi8vIGh0dHBzOi8vY29kYWhhbGUuY29tL2EtbGVzc29uLWluLXRpbWluZy1hdHRhY2tzLy5cblxuaW1wb3J0IHsgYXNzZXJ0LCBpbXBvcnRLZXksIHNpZ24gfSBmcm9tIFwiLi91dGlsLnRzXCI7XG5pbXBvcnQgdHlwZSB7IERhdGEgfSBmcm9tIFwiLi90eXBlcy5kLnRzXCI7XG5cbmZ1bmN0aW9uIGNvbXBhcmVBcnJheUJ1ZmZlcihhOiBBcnJheUJ1ZmZlciwgYjogQXJyYXlCdWZmZXIpOiBib29sZWFuIHtcbiAgYXNzZXJ0KGEuYnl0ZUxlbmd0aCA9PT0gYi5ieXRlTGVuZ3RoLCBcIkFycmF5QnVmZmVyIGxlbmd0aHMgbXVzdCBtYXRjaC5cIik7XG4gIGNvbnN0IHZhID0gbmV3IERhdGFWaWV3KGEpO1xuICBjb25zdCB2YiA9IG5ldyBEYXRhVmlldyhiKTtcbiAgY29uc3QgbGVuZ3RoID0gdmEuYnl0ZUxlbmd0aDtcbiAgbGV0IG91dCA9IDA7XG4gIGxldCBpID0gLTE7XG4gIHdoaWxlICgrK2kgPCBsZW5ndGgpIHtcbiAgICBvdXQgfD0gdmEuZ2V0VWludDgoaSkgXiB2Yi5nZXRVaW50OChpKTtcbiAgfVxuICByZXR1cm4gb3V0ID09PSAwO1xufVxuXG4vKiogQ29tcGFyZSB0d28gc3RyaW5ncywgVWludDhBcnJheXMsIEFycmF5QnVmZmVycywgb3IgYXJyYXlzIG9mIG51bWJlcnMgaW4gYVxuICogd2F5IHRoYXQgYXZvaWRzIHRpbWluZyBiYXNlZCBhdHRhY2tzIG9uIHRoZSBjb21wYXJpc29ucyBvbiB0aGUgdmFsdWVzLlxuICpcbiAqIFRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBtYXRjaCwgb3IgYGZhbHNlYCwgaWYgdGhleVxuICogZG8gbm90IG1hdGNoLiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbXBhcmUoYTogRGF0YSwgYjogRGF0YSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBjb25zdCBrZXkgPSBuZXcgVWludDhBcnJheSgzMik7XG4gIGdsb2JhbFRoaXMuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhrZXkpO1xuICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBpbXBvcnRLZXkoa2V5KTtcbiAgY29uc3QgYWggPSBhd2FpdCBzaWduKGEsIGNyeXB0b0tleSk7XG4gIGNvbnN0IGJoID0gYXdhaXQgc2lnbihiLCBjcnlwdG9LZXkpO1xuICByZXR1cm4gY29tcGFyZUFycmF5QnVmZmVyKGFoLCBiaCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsRUFBeUUsQUFBekUsdUVBQXlFO0FBRXpFLEVBQTBFLEFBQTFFLHdFQUEwRTtBQUMxRSxFQUF3RSxBQUF4RSxzRUFBd0U7QUFDeEUsRUFBb0QsQUFBcEQsa0RBQW9EO0FBRXBELE1BQU0sR0FBRyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksUUFBUSxDQUFXO1NBRzFDLGtCQUFrQixDQUFDLENBQWMsRUFBRSxDQUFjLEVBQVcsQ0FBQztJQUNwRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQWlDO0lBQ3ZFLEtBQUssQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pCLEtBQUssQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVU7SUFDNUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ1gsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0QsQ0FBQyxHQUFHLE1BQU0sQ0FBRSxDQUFDO1FBQ3BCLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUNsQixDQUFDO0FBRUQsRUFJbUIsQUFKbkI7Ozs7aUJBSW1CLEFBSm5CLEVBSW1CLENBQ25CLE1BQU0sZ0JBQWdCLE9BQU8sQ0FBQyxDQUFPLEVBQUUsQ0FBTyxFQUFvQixDQUFDO0lBQ2pFLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0lBQzdCLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUc7SUFDckMsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUc7SUFDckMsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxTQUFTO0lBQ2xDLEtBQUssQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBUztJQUNsQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLEVBQUU7QUFDbEMsQ0FBQyJ9