const fs = require("fs")

const build = new Date()
	.toISOString()
	.replace("T", "X")
	.replaceAll(":", ".")
	.substring(0, 19)
	.replaceAll("-", ".")
	.slice(2)
	.replaceAll(".", "")
	.replace("X", ".")

const build_dot = `alpha.${build}`
const build_hyphen = `alpha-${build.replaceAll(".", "-")}`

const file_dot = {
	number: build_dot,
}

const file_hyphen = {
	number: build_hyphen,
}

if (!fs.existsSync("dist")) {
	fs.mkdirSync("dist")
}

if (fs.existsSync("build")) {
	fs.rmdirSync("build", { recursive: true })
	fs.mkdirSync("build")
} else {
	fs.mkdirSync("build")
}

fs.writeFileSync("build.json", JSON.stringify(file_dot, null, "\t"))
fs.writeFileSync("dist/build.json", JSON.stringify(file_dot, null, "\t"))
fs.writeFileSync("build/build.json", JSON.stringify(file_hyphen, null, "\t"))

if (process.platform === "win32") {
	fs.writeFileSync(`build/authme-${build_hyphen}-windows.json`, JSON.stringify(file_dot, null, "\t"))
} else if (process.platform === "darwin") {
	fs.writeFileSync(`build/authme-${build_hyphen}-mac.json`, JSON.stringify(file_dot, null, "\t"))
} else {
	fs.writeFileSync(`build/authme-${build_hyphen}-linux.json`, JSON.stringify(file_dot, null, "\t"))
}
