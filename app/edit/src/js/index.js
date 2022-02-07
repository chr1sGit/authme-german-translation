const { aes, convert, time, localization } = require("@levminer/lib")
const logger = require("@levminer/lib/logger/renderer")
const { app, dialog } = require("@electron/remote")
const { ipcRenderer: ipc } = require("electron")
const path = require("path")
const fs = require("fs")

/**
 * Send error to main process
 */
window.onerror = (error) => {
	ipc.send("rendererError", { renderer: "edit", error: error })
}

/**
 * Start logger
 */
logger.getWindow("edit")

/**
 * Localization
 */
localization.localize("edit")

const lang = localization.getLang()

/**
 * Check if running in development
 */
let dev = false

if (app.isPackaged === false) {
	dev = true
}

/**
 * Get Authme folder path
 */
const folder_path = dev ? path.join(app.getPath("appData"), "Levminer", "Authme Dev") : path.join(app.getPath("appData"), "Levminer", "Authme")

/**
 * Read settings
 * @type {LibSettings}
 */
const settings = JSON.parse(fs.readFileSync(path.join(folder_path, "settings", "settings.json"), "utf-8"))

/**
 * Refresh settings
 */
const settings_refresher = setInterval(() => {
	file = JSON.parse(fs.readFileSync(path.join(folder_path, "settings", "settings.json"), "utf-8"))

	if (file.security.require_password !== null || file.security.password !== null) {
		clearInterval(settings_refresher)

		logger.log("Settings refresh completed")
	}
}, 100)

/**
 * Build number
 */
const buildNumber = async () => {
	const info = await ipc.invoke("info")

	if (info.build_number.startsWith("alpha")) {
		document.querySelector(".build-content").textContent = `You are running an alpha version of Authme - Version ${info.authme_version} - Build ${info.build_number}`
		document.querySelector(".build").style.display = "block"
	} else if (info.build_number.startsWith("beta")) {
		document.querySelector(".build-content").textContent = `You are running a beta version of Authme - Version ${info.authme_version} - Build ${info.build_number}`
		document.querySelector(".build").style.display = "block"
	}
}

buildNumber()

/**
 * Check for latest rollback
 */
const cache_path = path.join(folder_path, "rollbacks")
const rollback_con = document.querySelector(".rollback")
const rollback_text = document.querySelector("#rollbackText")
let cache = true

fs.readFile(path.join(cache_path, "rollback.authme"), "utf-8", (err, data) => {
	if (err) {
		logger.warn("Cache file don't exist")
	} else {
		logger.log("Cache file exists")

		rollback_con.style.display = "block"

		const edited_date = fs.statSync(cache_path).atime

		const year = edited_date.getFullYear()
		let month = edited_date.toLocaleString(lang.locale.code, { month: "long" })
		month = month.charAt(0).toUpperCase() + month.slice(1)
		const day = edited_date.toISOString().substring(8, 10)

		const temp_date = `${year}. ${month} ${day}.`
		const temp_time = `${edited_date.getHours().toString().padStart(2, "0")}:${edited_date.getMinutes().toString().padStart(2, "0")}:${edited_date.getSeconds().toString().padStart(2, "0")}`

		rollback_text.innerHTML = `${lang.text.latest_save}: <br /> ${temp_date}  ${temp_time}`
	}
})

/**
 * Rollback to the latest save
 */
const loadRollback = () => {
	dialog
		.showMessageBox({
			title: "Authme",
			buttons: [lang.button.yes, lang.button.cancel],
			defaultId: 1,
			cancelId: 1,
			type: "warning",
			noLink: true,
			message: lang.edit_dialog.load_rollback,
		})
		.then((result) => {
			if (result.response === 0) {
				fs.readFile(path.join(cache_path, "rollback.authme"), "utf-8", (err, data) => {
					if (err) {
						logger.error("Error reading hash file", err)
					} else {
						fs.writeFile(path.join(folder_path, "codes", "codes.authme"), data, (err) => {
							if (err) {
								logger.error("Failed to create codes.authme folder", err)
							} else {
								logger.log("rollback successful, codes.authme file created")

								dialog.showMessageBox({
									title: "Authme",
									buttons: [lang.button.close],
									type: "info",
									noLink: true,
									message: lang.edit_dialog.rollback_successful,
								})
							}
						})
					}
				})

				reloadApplication()
				reloadSettingsWindow()
			}
		})
}

/**
 * Init arrays
 */
const names = []
const secrets = []
const issuers = []

/**
 * Process data from saved file
 * @param {String} text
 */
const processdata = (text) => {
	const data = convert.fromText(text, 0)

	for (let i = 0; i < data.names.length; i++) {
		names.push(data.names[i])
		secrets.push(data.secrets[i])
		issuers.push(data.issuers[i])
	}

	go()
}

// block counter
let counter = 0

/**
 * Start creating edit elements
 */
const go = () => {
	document.querySelector(".codes_container").innerHTML = ""

	if (cache === true) {
		createRollback()
		cache = false
	}

	document.querySelector(".beforeLoad").style.display = "none"
	document.querySelector(".rollback").style.display = "none"
	document.querySelector(".afterLoad").style.display = "block"

	for (let j = 0; j < names.length; j++) {
		const codes_container = document.querySelector(".codes_container")

		const div = document.createElement("div")

		div.innerHTML = `
		<div id="grid${[counter]}" class="flex flex-col md:w-4/5 lg:w-2/3 mx-auto rounded-2xl bg-gray-800 mb-20">
		<div class="flex justify-center items-center">
		<h3 id="names${[counter]}">Name</h3>
		</div>
		<div class="flex justify-center items-center">
		<input class="input w-[320px]" type="text" id="edit_inp_${[counter]}" value="${names[counter]}" readonly/>
		</div>
		<div class="flex justify-center items-center mb-10 mt-5 gap-2">
		<button class="buttonr button" id="edit_but_${[counter]}" onclick="edit(${[counter]})">
		<svg id="edit_svg_${[counter]}" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
		</svg>
		</button>
		<button class="buttonr button" id="del_but_${[counter]}" onclick="del(${[counter]})">
		<svg id="del_svg_${[counter]}" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
		</svg>
		</button>
		</div>
		</div>
		`

		div.setAttribute("id", counter)
		codes_container.appendChild(div)

		document.querySelector(`#names${[counter]}`).textContent = `${issuers[counter]}`

		counter++
	}

	save_text = ""
}

/**
 * Edit mode
 */
let edit_mode = false

const edit = (number) => {
	const edit_but = document.querySelector(`#edit_but_${number}`)
	const edit_inp = document.querySelector(`#edit_inp_${number}`)

	edit_inp.focus()
	const length = edit_inp.value.length
	edit_inp.setSelectionRange(length, length)

	if (edit_mode === false) {
		edit_but.style.color = "green"
		edit_but.style.borderColor = "green"

		edit_inp.style.borderColor = "green"
		edit_inp.readOnly = false

		edit_mode = true
	} else {
		edit_but.style.color = ""
		edit_but.style.borderColor = "white"

		edit_inp.style.borderColor = "white"
		edit_inp.readOnly = true

		const inp_value = document.querySelector(`#edit_inp_${number}`)

		names[number] = inp_value.value

		edit_mode = false
	}
}

/**
 * Delete specified code
 */
const del = (number) => {
	const del_but = document.querySelector(`#del_but_${number}`)

	del_but.style.color = "red"
	del_but.style.borderColor = "red"

	counter = 0

	dialog
		.showMessageBox({
			title: "Authme",
			buttons: [lang.button.yes, lang.button.cancel],
			type: "warning",
			defaultId: 1,
			cancelId: 1,
			noLink: true,
			message: lang.edit_dialog.delete_code,
		})
		.then((result) => {
			if (result.response === 0) {
				del_but.style.color = ""
				del_but.style.borderColor = "white"

				const div = document.querySelector(`#grid${number}`)
				div.remove()

				names.splice(number, 1)
				secrets.splice(number, 1)
				issuers.splice(number, 1)

				go()
			} else {
				del_but.style.color = ""
				del_but.style.borderColor = "white"
			}
		})
}

/**
 * Confirm saving modifications
 */
let save_text = ""

const createSave = () => {
	dialog
		.showMessageBox({
			title: "Authme",
			buttons: [lang.button.yes, lang.button.cancel],
			defaultId: 1,
			cancelId: 1,
			type: "warning",
			noLink: true,
			message: lang.edit_dialog.create_save,
		})
		.then((result) => {
			if (result.response === 0) {
				for (let i = 0; i < names.length; i++) {
					const substr = `\nName:   ${names[i]} \nSecret: ${secrets[i]} \nIssuer: ${issuers[i]} \nType:   OTP_TOTP\n`
					save_text += substr
				}

				saveModifications()

				/**
				 * Load storage
				 * @type {LibStorage}
				 */
				let storage

				if (dev === false) {
					storage = JSON.parse(localStorage.getItem("storage"))

					storage.issuers = issuers

					localStorage.setItem("storage", JSON.stringify(storage))
				} else {
					storage = JSON.parse(localStorage.getItem("dev_storage"))

					storage.issuers = issuers

					localStorage.setItem("dev_storage", JSON.stringify(storage))
				}

				reloadApplication()
				reloadSettingsWindow()
			}
		})
}

/**
 * Saves the modifications made to the codes
 */
const saveModifications = async () => {
	let password
	let key

	if (settings.security.require_password === true) {
		password = Buffer.from(await ipc.invoke("request_password"))
		key = Buffer.from(aes.generateKey(password, Buffer.from(settings.security.key, "base64")))
	} else {
		/**
		 * Load storage
		 * @type {LibStorage}
		 */
		let storage

		if (dev === false) {
			storage = JSON.parse(localStorage.getItem("storage"))
		} else {
			storage = JSON.parse(localStorage.getItem("dev_storage"))
		}

		password = Buffer.from(storage.password, "base64")
		key = Buffer.from(aes.generateKey(password, Buffer.from(storage.key, "base64")))
	}

	const encrypted = aes.encrypt(save_text, key)

	/**
	 * Save codes
	 * @type{LibAuthmeFile}
	 * */
	const codes = {
		role: "codes",
		encrypted: true,
		codes: encrypted.toString("base64"),
		date: time.timestamp(),
		version: 3,
	}

	fs.writeFileSync(path.join(folder_path, "codes", "codes.authme"), JSON.stringify(codes, null, "\t"))

	password.fill(0)
	key.fill(0)
}

/**
 * Add more codes to existing ones
 */
const addCodes = () => {
	dialog
		.showOpenDialog({
			title: lang.application_dialog.choose_import_file,
			properties: ["openFile", "multiSelections"],
			filters: [{ name: lang.application_dialog.authme_file, extensions: ["authme"] }],
		})
		.then((result) => {
			canceled = result.canceled
			files = result.filePaths

			if (canceled === false) {
				for (let i = 0; i < files.length; i++) {
					fs.readFile(files[i], (err, input) => {
						if (err) {
							logger.error("Error loading file")
						} else {
							logger.log("File readed")

							const /** @type{LibAuthmeFile} */ loaded = JSON.parse(input.toString())

							if (loaded.role === "import" || loaded.role === "export") {
								data = []

								const container = document.querySelector(".codes_container")
								container.innerHTML = ""

								counter = 0

								const codes = Buffer.from(loaded.codes, "base64")

								const /** @type{LibImportFile} */ imported = convert.fromText(codes.toString(), 0)

								for (let i = 0; i < imported.names.length; i++) {
									names.push(imported.names[i])
									secrets.push(imported.secrets[i])
									issuers.push(imported.issuers[i])
								}

								go()
							} else {
								dialog.showMessageBox({
									title: "Authme",
									buttons: [lang.button.close],
									defaultId: 0,
									cancelId: 0,
									type: "error",
									noLink: true,
									message: `${lang.application_dialog.old_file_0} ${loaded.role} ${lang.application_dialog.old_file_1}`,
								})
							}
						}
					})
				}

				dialog.showMessageBox({
					title: "Authme",
					buttons: [lang.button.close],
					defaultId: 0,
					cancelId: 0,
					type: "info",
					noLink: true,
					message: lang.edit_dialog.codes_added,
				})
			}
		})
}

/**
 * Create rollback.authme file
 */
const createRollback = () => {
	fs.readFile(path.join(folder_path, "codes", "codes.authme"), "utf-8", (err, data) => {
		if (err) {
			logger.error("Error reading hash file", err)
		} else {
			if (!fs.existsSync(cache_path)) {
				fs.mkdirSync(cache_path)
			}

			const loaded = JSON.parse(data)
			loaded.role = "rollback"

			fs.writeFile(path.join(cache_path, "rollback.authme"), convert.fromJSON(loaded), (err) => {
				if (err) {
					logger.error("Failed to create cache folder", err)
				} else {
					logger.log("Rollback file created")
				}
			})
		}
	})
}

/**
 * No saved codes found
 */
const loadError = () => {
	fs.readFile(path.join(folder_path, "codes", "codes.authme"), "utf-8", (err, data) => {
		if (err) {
			dialog.showMessageBox({
				title: "Authme",
				buttons: [lang.button.close],
				type: "error",
				noLink: true,
				message: lang.export_dialog.no_save_found,
			})
		}
	})
}

/**
 * Loads saved codes from disk
 */
const loadCodes = async () => {
	if (fs.existsSync(path.join(folder_path, "rollbacks", "rollback.authme"))) {
		const result = await dialog.showMessageBox({
			title: "Authme",
			buttons: [lang.button.yes, lang.button.cancel],
			defaultId: 1,
			cancelId: 1,
			type: "warning",
			noLink: true,
			message: lang.edit_dialog.load_codes,
		})

		if (result.response === 0) {
			fs.readFile(path.join(folder_path, "codes", "codes.authme"), "utf-8", async (err, data) => {
				if (err) {
					dialog.showMessageBox({
						title: "Authme",
						buttons: [lang.button.close],
						type: "error",
						message: lang.export_dialog.no_save_found,
					})
				} else {
					let password
					let key

					if (settings.security.require_password === true) {
						password = Buffer.from(await ipc.invoke("request_password"))
						key = Buffer.from(aes.generateKey(password, Buffer.from(settings.security.key, "base64")))
					} else {
						/**
						 * Load storage
						 * @type {LibStorage}
						 */
						let storage

						if (dev === false) {
							storage = JSON.parse(localStorage.getItem("storage"))
						} else {
							storage = JSON.parse(localStorage.getItem("dev_storage"))
						}

						password = Buffer.from(storage.password, "base64")
						key = Buffer.from(aes.generateKey(password, Buffer.from(storage.key, "base64")))
					}

					fs.readFile(path.join(folder_path, "codes", "codes.authme"), (err, content) => {
						if (err) {
							logger.warn("The file codes.authme don't exists")

							password.fill(0)
							key.fill(0)
						} else {
							const codes_file = JSON.parse(content)

							const decrypted = aes.decrypt(Buffer.from(codes_file.codes, "base64"), key)

							processdata(decrypted.toString())

							decrypted.fill(0)
							password.fill(0)
							key.fill(0)
						}
					})
				}
			})
		}
	} else {
		fs.readFile(path.join(folder_path, "codes", "codes.authme"), "utf-8", async (err, data) => {
			if (err) {
				dialog.showMessageBox({
					title: "Authme",
					buttons: [lang.button.close],
					type: "error",
					noLink: true,
					message: lang.export_dialog.no_save_found,
				})
			} else {
				let password
				let key

				if (settings.security.require_password === true) {
					password = Buffer.from(await ipc.invoke("request_password"))
					key = Buffer.from(aes.generateKey(password, Buffer.from(settings.security.key, "base64")))
				} else {
					/**
					 * Load storage
					 * @type {LibStorage}
					 */
					let storage

					if (dev === false) {
						storage = JSON.parse(localStorage.getItem("storage"))
					} else {
						storage = JSON.parse(localStorage.getItem("dev_storage"))
					}

					password = Buffer.from(storage.password, "base64")
					key = Buffer.from(aes.generateKey(password, Buffer.from(storage.key, "base64")))
				}

				fs.readFile(path.join(folder_path, "codes", "codes.authme"), (err, content) => {
					if (err) {
						logger.warn("The file codes.authme don't exists")

						password.fill(0)
						key.fill(0)
					} else {
						const codes_file = JSON.parse(content)

						const decrypted = aes.decrypt(Buffer.from(codes_file.codes, "base64"), key)

						processdata(decrypted.toString())

						decrypted.fill(0)
						password.fill(0)
						key.fill(0)
					}
				})
			}
		})
	}
}

/**
 * Hide window
 */
const hide = () => {
	ipc.send("toggleEdit")
}

/**
 * Send reload events
 */
const reloadApplication = () => {
	ipc.send("reloadApplicationWindow")
}

const reloadSettingsWindow = () => {
	ipc.send("reloadSettingsWindow")
}

/**
 * Revert all current changes
 */
const revertChanges = () => {
	dialog
		.showMessageBox({
			title: "Authme",
			buttons: [lang.button.yes, lang.button.cancel],
			defaultId: 1,
			cancelId: 1,
			type: "warning",
			noLink: true,
			message: lang.edit_dialog.revert_changes,
		})
		.then((result) => {
			if (result.response === 0) {
				location.reload()
			}
		})
}

/**
 * Delete all codes
 */
const deleteCodes = () => {
	dialog
		.showMessageBox({
			title: "Authme",
			buttons: [lang.button.yes, lang.button.cancel],
			defaultId: 1,
			cancelId: 1,
			type: "warning",
			noLink: true,
			message: lang.edit_dialog.delete_all_codes,
		})
		.then((result) => {
			if (result.response === 0) {
				// clear codes
				fs.rm(path.join(folder_path, "codes", "codes.authme"), (err) => {
					if (err) {
						return logger.error(`Error deleting codes - ${err}`)
					} else {
						logger.log("Codes deleted")
					}
				})

				/**
				 * Load storage
				 * @type {LibStorage}
				 */
				let storage

				if (dev === false) {
					storage = JSON.parse(localStorage.getItem("storage"))

					storage.issuers = undefined

					localStorage.setItem("storage", JSON.stringify(storage))
				} else {
					storage = JSON.parse(localStorage.getItem("dev_storage"))

					storage.issuers = undefined

					localStorage.setItem("dev_storage", JSON.stringify(storage))
				}

				reloadApplication()
				reloadSettingsWindow()

				setTimeout(() => {
					location.reload()
				}, 100)
			}
		})
}
