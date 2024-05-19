import { localeEN } from "@utils/language/en"

export const localeDE: typeof localeEN = {
	common: {
		confirm: "Bestätigen",
		continue: "Weiter",
		cancel: "Abbrechen",
		close: "Schließen",
		copy: "Kopieren",
		copied: "Kopiert",
		moreOptions: "Weitere Optionen",
		name: "Name",
		description: "Beschreibung",
		edit: "Bearbeiten",
		delete: "Löschen",
	},

	menu: {
		codes: "Codes",
		import: "Importieren",
		export: "Exportieren",
		edit: "Bearbeiten",
		settings: "Einstellungen",
		show: "Authme anzeigen",
		exit: "Authme beenden",
	},

	landing: {
		welcome: "Willkommen!",
		gettingStarted: "Erste Schritte",
		gettingStartedText: "Wählen Sie, wie Sie Authme verwenden möchten.",
		passwordAuth: "Passwort-Authentifizierung",
		passwordAuthText: "Sie müssen jedes Mal ein Passwort eingeben, wenn Sie Authme starten.",
		noAuth: "Keine Authentifizierung",
		noAuthText: "Wenn Sie nicht jedes Mal ein Passwort eingeben möchten, wenn Sie Authme starten.",
		hardwareAuth: "Hardware-Authentifizierung",
		hardwareAuthText: "Bestätigen Sie wichtige Aktionen mit Windows Hello, Touch ID oder einem beliebigen WebAuthn-kompatiblen Hardwareschlüssel.",
		createPass: "Passwort erstellen",
		createPassText: "Erstellen Sie ein starkes Passwort, um Ihre Codes zu verschlüsseln.",
		password: "Passwort",
		confirmPassword: "Passwort bestätigen",
		chooseDifferent: "Wählen Sie eine andere Authentifizierung",
		chooseDifferentText: "Gehen Sie zur vorherigen Seite zurück und wählen Sie eine andere Authentifizierungsmethode.",
		goBack: "Zurück",
		dialog: {
			passwordsNotMatch: "Passwörter stimmen nicht überein. \n\nBitte versuchen Sie es erneut!",
			passwordMinLength: "Die Mindestlänge des Passworts beträgt 8 Zeichen. \n\nBitte versuchen Sie es erneut!",
			passwordMaxLength: "Die maximale Passwortlänge beträgt 64 Zeichen. \n\nBitte versuchen Sie es erneut!",
			commonPassword: "Dieses Passwort befindet sich auf der Liste der 1000 häufigsten Passwörter. Bitte wählen Sie ein sichereres Passwort!",
		},
	},

	confirm: {
		welcomeBack: "Willkommen zurück!",
		confirmPassword: "Passwort bestätigen",
		confirmPasswordText: "Bitte geben Sie Ihr Passwort ein, um fortzufahren.",
		password: "Passwort",
		forgotPassword: "Passwort vergessen?",
		forgotPasswordText: "Ihre Codes sind durch Ihr Passwort geschützt. Wenn Sie Ihr Passwort vergessen haben, können Sie nicht auf Ihre Codes zugreifen.",
		dialog: {
			wrongPassword: "Falsches Passwort! \n\nBitte versuchen Sie es erneut!",
		},
	},

	codes: {
		importCodes: "Importieren Sie Ihre 2FA-Codes",
		importCodesText: "Importieren Sie Ihre vorhandenen 2FA-Codes auf der Importseite.",
		importCodesButton: "Codes importieren",
		noSearchResultsFound: "Keine Suchergebnisse gefunden",
		noSearchResultsFoundText: "Keine Suchergebnisse gefunden für",
		dialog: {
			noSaveFileFound: "Keine gespeicherte Datei gefunden. \n\nGehen Sie zu den Codes oder zur Importseite und importieren Sie Ihre Codes!",
			codesImported: "Codes importiert. \n\n Sie können Ihre Codes auf der Bearbeitungsseite bearbeiten.",
		},
	},

	import: {
		supportedTypes: "Unterstützte 2FA-Typen",
		totpQRCode: "TOTP",
		totpQRCodeText: "Ein TOTP-QR-Code ist das, was Sie fast überall finden, wenn Sie 2FA einrichten möchten. Besteht aus 6 Ziffern, die sich alle 30 Sekunden ändern.",
		instructions: "Anleitung",
		googleAuthQRCode: "Google Authenticator",
		googleAuthQRCodeText: "Wenn Sie Google Authenticator verwenden, können Sie alle Ihre vorhandenen Codes exportieren und in Authme importieren.",
		chooseImportMethod: "Importmethode auswählen",
		importFromImage: "Aus Bild importieren",
		importFromImageText: "Wählen Sie ein Bild aus, das einen kompatiblen QR-Code enthält.",
		chooseImageButton: "Bild auswählen",
		enterSecretManually: "Einrichtungsschlüssel eingeben",
		enterSecretManuallyText: "Geben Sie einen TOTP-Geheimschlüssel und einen Namen ein.",
		enterSecretManuallyButton: "Schlüssel einrichten",
		screenCapture: "Bildschirmaufnahme",
		screenCaptureText: "Erfassen Sie einen kompatiblen QR-Code von Ihrem Bildschirm.",
		screenCaptureButton: "Bildschirm aufnehmen",
		webcam: "Webcam",
		webcamText: "Verwenden Sie Ihre Webcam, um einen kompatiblen QR-Code zu scannen.",
		webcamButton: "Webcam verwenden",
		// authme
		authme: "Authme",
		authmeText: "Importieren Sie alle Ihre Codes aus Authme.",
		authmeFile: "Authme-Datei",
		authmeFileText: "Importieren Sie alle Codes aus einer vorhandenen Authme-Importdatei, die Sie aus Authme exportiert haben.",
		authmeFileButton: "Datei auswählen",
		// 2FAS
		twoFasAuth: "2FAS Authenticator",
		twoFasAuthText: "Importieren Sie alle Codes aus einem 2FAS-Authenticator-Backup.",
		twoFasFile: "2FAS-Sicherungsdatei (ohne Passwort)",
		twoFasFileText: "Importieren Sie alle Codes aus einer vorhandenen 2FAS-Sicherungsdatei ohne Passwort.",
		twoFasFileButton: "Datei auswählen",
		// aegis
		aegisAuth: "Aegis Authenticator",
		aegisAuthText: "Importieren Sie alle Codes aus einem Aegis-Tresor.",
		aegisFile: "Aegis-Tresordatei (ohne Passwort)",
		aegisFileText: "Importieren Sie alle Codes aus einer vorhandenen Aegis-Tresordatei ohne Passwort.",
		aegisFileButton: "Datei auswählen",
		// html dialogs
		captureScreenTitle: "Bildschirmaufnahme aufnehmen",
		captureScreenWaiting: "Warten auf QR-Code...",
		manualEntry: "Schlüssel einrichten",
		manualEntryText: "Bitte geben Sie einen Namen und einen geheimen 2FA-Schlüssel ein.",
		manualEntryName: "Name (Erforderlich)",
		manualEntrySecret: "Geheimschlüssel (Erforderlich)",
		manualEntryDescription: "Beschreibung",
		// tutorial
		googleAuthTutorial: [
			"Exportieren Sie die 2FA-Codes aus der Google Authenticator-App: Tippen Sie auf das Hamburger-Menü in der oberen linken Ecke des Bildschirms: Konten übertragen > Konten exportieren",
			"Speichern Sie die Migrations-QR-Codes mit einem Screenshot oder machen Sie ein Foto mit einem anderen Telefon, wenn Sie Android verwenden. Übertragen Sie diese Bilder auf Ihren Computer.",
			"Gehen Sie in Authme zur Importseite: Seitenleiste > Import",
			"Klicken Sie auf die Schaltfläche „Bilder auswählen“ und wählen Sie die Bilder aus, die Sie von Ihrem Telefon übertragen haben."
		],
		totpTutorial: [
			"Gehen Sie zur Website, auf der Sie 2FA einrichten möchten.",
			"Erstellen Sie einen Screenshot (Tastenkombination Windows-Taste + Umschalttaste + S unter Windows, Cmd + Umschalttaste + 3 unter macOS) des QR-Codes und speichern Sie das Bild.",
			"Gehen Sie in Authme zur Importseite: Seitenleiste > Import",
			"Klicken Sie auf die Schaltfläche „Bilder auswählen“ und wählen Sie das Bild aus."
		],
		authmeTutorial: [
			"Gehen Sie in Authme zur Exportseite und wählen Sie „Authme-Datei exportieren“.",
			"Sie können diese Datei in Authme auf der Importseite importieren."
		],
		aegisTutorial: [
			"Tippen Sie auf das Hamburger-Menü in der oberen rechten Ecke des Bildschirms: Einstellungen > Importieren & Exportieren > Exportieren",
			"Wählen Sie das Aegis-JSON-Format aus, deaktivieren Sie das Kontrollkästchen „Verschlüsselung“ und exportieren Sie Ihren Tresor.",
			"Übertragen Sie die Datei auf Ihren Computer und importieren Sie sie in Authme."
		],
		twoFasTutorial: [
			"Tippen Sie auf Einstellungen in der Navigationsleiste: 2FAS-Backup > In Datei exportieren",
			"Aktivieren Sie das Kontrollkästchen „Exportdatei ohne Passwort“ und tippen Sie auf „Exportieren“.",
			"Übertragen Sie die Datei auf Ihren Computer und importieren Sie sie in Authme."
		],
	},

	export: {
		exportCodes: "Codes exportieren",
		exportAuthmeFile: "Authme-Datei exportieren",
		exportAuthmeFileText: "Ideal zum Importieren für Authme oder andere Authme-Apps.",
		exportHTMlFile: "HTML-Datei exportieren",
		exportHTMlFileText: "Ideal zum Scannen der QR-Codes oder als Sicherung.",
		exportFileButton: "Datei exportieren"
	},

	edit: {
		editCodes: "Codes bearbeiten",
		dialog: {
			saveChanges: "Möchten Sie Ihre Änderungen speichern?",
			deleteCode: "Sind Sie sicher, dass Sie diesen Code löschen möchten?"
		},
	},

	settings: {
		general: "Allgemein",
		launchOnStartup: "Bei Systemstart automatisch starten",
		launchOnStartupText: "Starte Authme automatisch beim Systemstart in der Systemleiste.",
		minimizeToTray: "In Systemleiste minimieren",
		minimizeToTrayText: "Beim Schließen der App wird Authme nicht beendet. Sie können Authme aus der Systemleiste öffnen.",
		optionalAnalytics: "Optionale Analyse",
		optionalAnalyticsText: "Die gesendeten Nutzungsdaten sind vollständig anonym und umfassen Ihre Authme-Version und Informationen zu Ihrem Computer.",
		windowCapture: "Fensteraufnahme",
		windowCaptureText: "Standardmäßig kann Authme nicht von externen Programmen erfasst werden. Wenn Sie diese Option aktivieren, gilt dies bis zum Neustart von Authme.",
		clearData: "Daten löschen",
		clearDataText: "Löscht Passwort, 2FA-Codes und alle anderen Einstellungen. Seien Sie vorsichtig, dies kann nicht rückgängig gemacht werden!",
		clearDataButton: "Daten löschen",
		codes: "Codes",
		codesDescription: "Codes-Beschreibung",
		codesDescriptionText: "Die Beschreibung der 2FA-Codes anzeigen. Sie können sie nach dem Anklicken kopieren.",
		blurCodes: "Codes verschwimmen",
		blurCodesText: "Zeigt die die gespeicherten Codes unscharf an. Sie können die Codes weiterhin kopieren oder mit der Maus über die Codes fahren, um sie anzuzeigen.",
		codesLayout: "Codes-Layout",
		codesLayoutText: "Wählen Sie ihr bevorzugtes Layout. Grid zeigt mehr Elemente an und passt sich der Bildschirmgröße an.",
		sortCodes: "Codes sortieren",
		sortCodesText: "Sie können festlegen, wie die Codes sortiert werden sollen. Standardmäßig werden die Codes nach Importreihenfolge sortiert.",
		shortcuts: "Tastaturkürzel",
		shortcutsEditButton: "Bearbeiten",
		shortcutsResetButton: "Zurücksetzen",
		shortcutsDeleteButton: "Löschen",
		about: "Über",
		feedback: "Feedback",
		feedbackText: "Vielen Dank für Ihr Feedback! Bitte melden Sie Probleme oder Funktionsanfragen auf GitHub oder per E-Mail (authme@levminer.com).",
		logs: "Logs",
		logsText: "Sie können die Logs zur Fehlerbehebung anzeigen.",
		showLogsButton: "Logs anzeigen",
		aboutAuthme: "Über Authme",
		aboutAuthmeText: "Informationen zu Ihrem Authme-Build und Ihrem Computer."
	},
}