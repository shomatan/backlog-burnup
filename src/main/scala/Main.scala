import facade.googleappsscript.GoogleAppsScript.SpreadsheetApp

import scala.scalajs.js.annotation._

object Main {

  @JSExportTopLevel("onOpenImpl")
  def onOpen(): Unit = {
    SpreadsheetApp
      .getUi()
      .createMenu("Backlog")
      .addItem("Step-1: Init", "init")
      // .addItem("Step-2: Run", "run")
      .addToUi()
  }

  @JSExportTopLevel("init")
  def init(): Unit =
    throw new Exception("init!")

}
