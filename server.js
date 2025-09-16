const http = require("http");
const students = require("./students.json");
const courses = require("./courses.json");
/*
 * findMyAccount(humberid)
 * ------------------------
 * - Accepts your own Humber ID as input
 * - Search in students.json for the student object with that ID
 * - If found, return the student object
 * - If not found, reject with "Account Not Found"
 * - Must return a Promise
 */
function findMyAccount(humberid) {
  return new Promise((resolve, reject) => {
    const student = students.find((s) => s.humberid === humberid);
    student ? resolve(student) : reject("Account Not Found");
  });
}
/*
 * findMyCourses(course_id_arr)
 * ----------------------------
 * - Accepts an array of course IDs
 * - Filter courses.json to return only the courses that match the IDs
 * - If no courses are found, reject with "Courses Not Found"
 * - Must return a Promise
 * - Courses to fetch:
 *   ["CPAN 209", "CPAN 211", "CPAN 213", "CPAN 214"]
 */
function findMyCourses(courseIDs) {
  return new Promise((resolve, reject) => {
    const matched = courses.filter((c) => courseIDs.includes(c.course_id));
    matched.length ? resolve(matched) : reject("Courses Not Found");
  });
}
/*
 * HTTP Server
 * ----------- 
 * - Use Node's built-in http module
 * - Create the server using http.createServer()
 * - Inside the server callback:
 *     - Call findMyAccount() with your own Humber ID
 *     - Call findMyCourses() with the course IDs above
 *     - Add the returned courses into your account
 *     - Send the result(your account with courses) back to the client using res.end()
 *       - Hint: The res.end() function only accepts a string or a buffer.
 *         You need to convert the student object to a string using JSON.stringify()
 * - Start the server on port 3000
 * - Run your server using node server.js
 * - Test using Postman → http://localhost:3000/
 */
const server = http.createServer(async (req, res) => {
  try {
    const account = await findMyAccount("N01708324"); //put humber id here
    account.myCourses = await findMyCourses([
      "CPAN 209","CPAN 211","CPAN 213","CPAN 214"
    ]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(account, null, 2));
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(err);
  }
});
server.listen(3000, () => console.log("Server running at http://localhost:3000/"));
