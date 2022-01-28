// noinspection JSUnusedGlobalSymbols

class Report {
  async renderReport(inputData) {
    const reportData = this.transformToReportData(inputData);
    this.renderReportData(reportData);
  }

  async exportToFile(inputData) {
    await this.createStream();

    const reportData = this.transformToReportData(inputData);
    this.saveReportDataToStream(reportData);

    await this.closeStream();
  }

  transformToReportData(inputData) {
    return [
      `Report: ${this.formatText(inputData.name)} \n`,
      `Product: ${this.formatText(inputData.product)} \n`,
      `Start date: ${this.formatDate(inputData.startDate)} \n`,
      `End date: ${this.formatDate(inputData.endDate)} \n`,
      `Total: ${inputData.total} \n`,
      `Average x day: ${this.formatAverage(inputData.total / 365)} \n`,
      `Average x week: ${this.formatAverage(inputData.total / 52)} \n`,
      `Average x month: ${this.formatAverage(inputData.total / 12)} \n`,
    ];
  }

  //the uninteresting section..
  formatAverage() {}

  formatDate(date) {}

  formatText(text) {}

  firstWordLetterToUpper(text) {}

  renderReportData(text) {}

  saveReportDataToStream(reportData, fileStream) {}

  async createStream() {}

  async closeStream() {}
}
