type AlertType = 'error' | 'success' | 'warning';

export interface AlertItem {
  id?: number;
  message?: string;
  type?: AlertType;
}
