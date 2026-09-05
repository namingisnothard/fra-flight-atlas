// Read-only rendering of publisher PDFs; keeps original page content and credits.
import Foundation
import PDFKit
import AppKit

for name in ["db-airport-long-distance", "rmv-frankfurt-airport"] {
    let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath).appendingPathComponent("public/maps")
    guard let document = PDFDocument(url: root.appendingPathComponent("\(name).pdf")) else { fatalError("Cannot read \(name)") }
    for index in 0..<document.pageCount {
        guard let page = document.page(at: index) else { fatalError("Missing page") }
        let bounds = page.bounds(for: .mediaBox)
        let scale = 2200 / bounds.width
        let size = NSSize(width: 2200, height: bounds.height * scale)
        let image = page.thumbnail(of: size, for: .mediaBox)
        guard let tiff = image.tiffRepresentation, let bitmap = NSBitmapImageRep(data: tiff), let png = bitmap.representation(using: .png, properties: [:]) else { fatalError("Render failed") }
        try png.write(to: root.appendingPathComponent("\(name)-\(index + 1).png"))
        print("\(name) page \(index + 1): \(page.string?.suffix(450) ?? "")")
    }
}
