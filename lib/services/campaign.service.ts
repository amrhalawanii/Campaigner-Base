import { apiService } from './api.service';
import type { 
  Campaign, 
  Media,
  ApiResponse 
} from '../types/api.types';

export class CampaignService {
  async getCampaign(campaignId: number, userId?: number): Promise<ApiResponse<Campaign>> {
    return apiService.get<Campaign>('/get_campaign.php', {
      campaign_id: campaignId,
      ...(userId && { user_id: userId }),
    });
  }

  async getMedia(mediaId: number): Promise<ApiResponse<Media>> {
    return apiService.get<Media>('/get_media.php', { media_id: mediaId });
  }

  async getHomePageData(userId: number): Promise<ApiResponse<{
    my_campaigns?: Campaign[];
    you_might_like?: Campaign[];
    trending_campaigns?: Campaign[];
    saved_campaigns?: Campaign[];
    case_studies?: any[];
  }>> {
    return apiService.get('/get_home_page_data.php', { user_id: userId });
  }

  async getAllCampaigns(userId?: number): Promise<ApiResponse<Campaign[]>> {
    const params: Record<string, any> = {};
    if (userId) {
      params.user_id = userId;
    }
    return apiService.get<Campaign[]>('/get_all_campaigns.php', params);
  }

  async saveCampaign(campaignId: number, userId: number): Promise<ApiResponse<{ is_saved: boolean }>> {
    return apiService.post<{ is_saved: boolean }>('/save_to_bookmark.php', {
      campaign_id: campaignId,
      user_id: userId,
    });
  }

  async unsaveCampaign(campaignId: number, userId: number): Promise<ApiResponse<{ is_saved: boolean }>> {
    return apiService.post<{ is_saved: boolean }>('/unsave_bookmark.php', {
      campaign_id: campaignId,
      user_id: userId,
    });
  }

  async toggleSaveCampaign(campaignId: number, userId: number, currentSavedState: boolean): Promise<ApiResponse<{ is_saved: boolean }>> {
    // Use save/unsave endpoints based on current state
    if (currentSavedState) {
      return this.unsaveCampaign(campaignId, userId);
    } else {
      return this.saveCampaign(campaignId, userId);
    }
  }
}

export const campaignService = new CampaignService();

