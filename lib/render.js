import fs from 'fs';

export default function render(fileName, res) {
    if (fs.existsSync("../views/" + fileName)) {
        const content = fs.readFileSync("../views/" + fileName);
        res.writeHead(200, { 'content-type': 'text/html'});
        res.write(content);
        res.end();
    } else {
        res.status(404);
        res.end();
    }
}